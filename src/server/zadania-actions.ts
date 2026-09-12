"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { wymagajUzytkownika } from "@/lib/sesja";

const schemat = z.object({
  tresc: z.string().trim().min(1).max(500),
  priorytet: z.enum(["NISKI", "NORMALNY", "WYSOKI"]).default("NORMALNY"),
  // Pole daty bywa puste — pusty string traktujemy jak brak terminu.
  termin: z
    .string()
    .trim()
    .transform((wartosc) => (wartosc ? new Date(wartosc) : null))
    .refine((data) => data === null || !Number.isNaN(data.getTime()), "Zła data"),
});

export async function dodajZadanie(formData: FormData) {
  const uzytkownik = await wymagajUzytkownika();

  const dane = schemat.safeParse({
    tresc: formData.get("tresc"),
    priorytet: formData.get("priorytet") ?? "NORMALNY",
    termin: formData.get("termin") ?? "",
  });
  if (!dane.success) return;

  await prisma.zadanie.create({
    data: { ...dane.data, wlascicielId: uzytkownik.id },
  });

  revalidatePath("/panel/zadania");
  revalidatePath("/panel");
}

export async function przelaczZadanie(id: string, zrobione: boolean) {
  const uzytkownik = await wymagajUzytkownika();

  await prisma.zadanie.updateMany({
    where: { id, wlascicielId: uzytkownik.id },
    data: { zrobioneO: zrobione ? new Date() : null },
  });

  revalidatePath("/panel/zadania");
  revalidatePath("/panel");
}

export async function usunZadanie(id: string) {
  const uzytkownik = await wymagajUzytkownika();

  await prisma.zadanie.deleteMany({ where: { id, wlascicielId: uzytkownik.id } });

  revalidatePath("/panel/zadania");
  revalidatePath("/panel");
}
