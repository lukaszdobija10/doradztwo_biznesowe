import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import { maDostep } from "./dostep";
import { prisma } from "./prisma";

/**
 * Warstwa dostępu do danych zalogowanego użytkownika.
 *
 * Każde odpytanie bazy w panelu przechodzi przez ten moduł, żeby nigdzie nie
 * dało się pobrać notatki czy zadania bez filtra po właścicielu. `cache`
 * sprawia, że w obrębie jednego żądania sprawdzenie sesji wykonuje się raz,
 * nawet jeśli pyta o nie kilka komponentów.
 *
 * Token sesji celowo nie wystarcza: adres jest ponownie konfrontowany z listą
 * PANEL_EMAILS, więc odebranie komuś dostępu działa natychmiast, bez czekania
 * aż wygaśnie jego ciasteczko.
 */
export const pobierzUzytkownika = cache(async () => {
  const sesja = await auth();
  const email = sesja?.user?.email;

  if (!sesja?.user?.id || !maDostep(email)) return null;

  const uzytkownik = await prisma.uzytkownik.findUnique({
    where: { id: sesja.user.id },
    select: { id: true, email: true, imie: true, obrazek: true },
  });

  return uzytkownik;
});

export type Uzytkownik = NonNullable<Awaited<ReturnType<typeof pobierzUzytkownika>>>;

/** Jak wyżej, ale zamiast `null` odsyła na stronę logowania. */
export async function wymagajUzytkownika(): Promise<Uzytkownik> {
  const uzytkownik = await pobierzUzytkownika();
  if (!uzytkownik) redirect("/logowanie");
  return uzytkownik;
}
