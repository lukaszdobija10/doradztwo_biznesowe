import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { authConfig } from "./auth.config";
import { maDostep, googleSkonfigurowany } from "./dostep";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // Dopóki w .env nie ma danych z Google Cloud, nie rejestrujemy providera.
  // Inaczej przycisk logowania kończyłby się błędem 500 zamiast czytelnym
  // komunikatem na stronie logowania.
  providers: googleSkonfigurowany() ? [Google] : [],
  callbacks: {
    ...authConfig.callbacks,

    /**
     * Bramka dostępu. Google potwierdza tylko tożsamość — o tym, czy ta
     * tożsamość ma prawo wejść do panelu, decyduje lista PANEL_EMAILS.
     *
     * Konto w bazie zakładamy dopiero tutaj, po pozytywnej weryfikacji. Efektem
     * ubocznym jest to, że `user.id` z Google podmieniamy na identyfikator
     * naszego rekordu — to on trafia potem do tokenu sesji.
     */
    async signIn({ user }) {
      const email = user.email?.trim().toLowerCase();
      if (!maDostep(email)) return false;

      const rekord = await prisma.uzytkownik.upsert({
        where: { email: email! },
        create: {
          email: email!,
          imie: user.name ?? null,
          obrazek: user.image ?? null,
          ostatnieLogowanie: new Date(),
        },
        update: {
          imie: user.name ?? undefined,
          obrazek: user.image ?? undefined,
          ostatnieLogowanie: new Date(),
        },
      });

      user.id = rekord.id;
      return true;
    },
  },
});
