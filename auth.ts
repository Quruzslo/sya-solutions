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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const safeEmail = String(credentials.email);
        const safePassword = String(credentials.password);

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
