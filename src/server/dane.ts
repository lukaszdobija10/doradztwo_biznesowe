import "server-only";

import { prisma } from "@/lib/prisma";

/**
 * Odczyty panelu.
 *
 * Każda funkcja przyjmuje `wlascicielId` i wstawia go do zapytania — nie ma tu
 * wariantu „pobierz wszystko". Dzięki temu pomyłka w komponencie nie może
 * skończyć się pokazaniem cudzych danych.
 */

export function notatki(wlascicielId: string) {
  return prisma.notatka.findMany({
    where: { wlascicielId },
    orderBy: [{ przypieta: "desc" }, { zmieniona: "desc" }],
  });
}

export function notatka(wlascicielId: string, id: string) {
  // findFirst, nie findUnique — warunek musi objąć właściciela, inaczej cudze
  // id w adresie otwierałoby cudzą notatkę.
  return prisma.notatka.findFirst({ where: { id, wlascicielId } });
}

export function zadania(wlascicielId: string) {
  return prisma.zadanie.findMany({
    where: { wlascicielId },
    orderBy: [
      { zrobioneO: "asc" }, // niezrobione (null) idą pierwsze
      { termin: { sort: "asc", nulls: "last" } },
      { utworzone: "desc" },
    ],
  });
}

export function aplikacje(wlascicielId: string) {
  return prisma.aplikacja.findMany({
    where: { wlascicielId },
    orderBy: [{ kolejnosc: "asc" }, { nazwa: "asc" }],
  });
}

/** Liczby na stronę główną panelu — jednym zapytaniem zamiast pobierania list. */
export async function podsumowanie(wlascicielId: string) {
  const [doZrobienia, naDzis, wszystkieNotatki] = await Promise.all([
    prisma.zadanie.count({ where: { wlascicielId, zrobioneO: null } }),
    prisma.zadanie.count({
      where: {
        wlascicielId,
        zrobioneO: null,
        termin: { lte: koniecDnia() },
      },
    }),
    prisma.notatka.count({ where: { wlascicielId } }),
  ]);

  return { doZrobienia, naDzis, wszystkieNotatki };
}

/** Dzisiejsza data o 23:59 — granica dla „na dziś" razem z zaległymi. */
function koniecDnia(): Date {
  const teraz = new Date();
  return new Date(teraz.getFullYear(), teraz.getMonth(), teraz.getDate(), 23, 59, 59);
}
