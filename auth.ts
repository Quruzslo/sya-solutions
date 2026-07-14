// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        recaptchaToken: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const safeEmail = String(credentials.email);
        const safePassword = String(credentials.password);
        const token = credentials.recaptchaToken
          ? String(credentials.recaptchaToken)
          : null;

        //  RECAPTCHA ELLENŐRZÉS

        if (!token) {
          console.error("Biztonsági hiba: Hiányzó reCAPTCHA token!");
          throw new Error("reCAPTCHA ellenőrzés szükséges.");
        }

        try {
          const secretKey = process.env.RECAPTCHA_SECRET_KEY;
          const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

          const recaptchaRes = await fetch(verificationUrl, { method: "POST" });
          const recaptchaData = await recaptchaRes.json();

          if (!recaptchaData.success || recaptchaData.score < 0.7) {
            console.warn(
              `Blokkolt bot kísérlet! Pontszám: ${recaptchaData.score || "N/A"}`,
            );
            throw new Error(
              "Automatizált hálózatot érzékeltünk. Belépés megtagadva.",
            );
          }
        } catch (captchaError: any) {
          console.error("reCAPTCHA validációs hiba:", captchaError);

          if (captchaError.message?.includes("Automatizált"))
            throw captchaError;
          throw new Error("Biztonsági ellenőrzési hiba történt.");
        }

        try {
          const { client } = await import("./lib/mongodb");
          const bcrypt = await import("bcryptjs");
          const db = client.db("main");
          const user = await db.collection("admin").findOne({
            email: safeEmail,
          });

          if (!user || !user.password) {
            throw new Error("Hibás email vagy jelszó!");
          }

          const isValid = await bcrypt.compare(safePassword, user.password);

          if (!isValid) {
            throw new Error("Hibás email vagy jelszó!");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Szerveroldali login hiba:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "credentials" && user) {
        token.userId = user.id ?? null;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin-belepes",
  },
});
