import type { NextAuthConfig } from "next-auth";

/**
 * Konfiguracja współdzielona między środowiskiem Edge (proxy.ts) a serwerem.
 *
 * Proxy działa w Edge, gdzie nie da się uruchomić Prismy — trzymamy tu więc
 * wyłącznie rzeczy niezależne od bazy. Sama weryfikacja podpisu tokenu sesji
 * jest w Edge bezpieczna. Provider Google, który sięga do bazy przy logowaniu,
 * dokładany jest dopiero w src/lib/auth.ts.
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/logowanie",
    error: "/logowanie",
  },
  providers: [],
  callbacks: {
    /**
     * Identyfikator z bazy wędruje do tokenu przy logowaniu, żeby kolejne
     * żądania nie musiały szukać użytkownika po adresie e-mail. Uprawnienia
     * i tak są sprawdzane ponownie w src/lib/sesja.ts — token służy tylko do
     * szybkiego odsiania niezalogowanych.
     */
    jwt({ token, user }) {
      if (user?.id) {
        token.uzytkownikId = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // Token jest zwykłym obiektem JSON — typ sprawdzamy, zamiast zakładać.
      // Stary token sprzed wprowadzenia tego pola po prostu nie dostanie id
      // i zostanie odrzucony w warstwie dostępu do danych.
      if (typeof token.uzytkownikId === "string") {
        session.user.id = token.uzytkownikId;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
