import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * A 'user' objektum kiterjesztése
   */
  interface User extends DefaultUser {
    role?: string;
  }

  /**
   * A 'session' objektum kiterjesztése
   */
  interface Session {
    user: {
      id?: string;
      role?: string;
      tel?: string;
      photo?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * A 'jwt' (token) objektum kiterjesztése
   */
  interface JWT {
    userId?: string | null;
    role?: string;
  }
}
