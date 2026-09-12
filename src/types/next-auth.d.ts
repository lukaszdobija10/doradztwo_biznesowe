import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Identyfikator rekordu Uzytkownik z naszej bazy, nie identyfikator Google. */
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uzytkownikId?: string;
  }
}
