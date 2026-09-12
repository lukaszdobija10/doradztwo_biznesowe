"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { wymagajUzytkownika } from "@/lib/sesja";

const schemat = z.object({
  tytul: z.string().trim().min(1, "Notatka potrzebuje tytułu").max(200),
  tresc: z.string().max(50_000).default(""),
});

export async function dodajNotatke(formData: FormData) {
  const uzytkownik = await wymagajUzytkownika();

  const dane = schemat.safeParse({
    tytul: formData.get("tytul"),
    tresc: formData.get("tresc") ?? "",
  });
  if (!dane.success) return;

  const notatka = await prisma.notatka.create({
    data: { ...dane.data, wlascicielId: uzytkownik.id },
  });

  revalidatePath("/panel/notatki");
  revalidatePath("/panel");
  redirect(`/panel/notatki/${notatka.id}`);
}

export async function zapiszNotatke(id: string, formData: FormData) {
  const uzytkownik = await wymagajUzytkownika();

  const dane = schemat.safeParse({
    tytul: formData.get("tytul"),
    tresc: formData.get("tresc") ?? "",
  });
  if (!dane.success) return;

  // updateMany z warunkiem na właściciela: podmiana id w formularzu nie ruszy
  // cudzego rekordu, tylko zaktualizuje zero wierszy.
  await prisma.notatka.updateMany({
    where: { id, wlascicielId: uzytkownik.id },
    data: dane.data,
  });

  revalidatePath("/panel/notatki");
  revalidatePath(`/panel/notatki/${id}`);
  revalidatePath("/panel");
}

export async function przypnijNotatke(id: string, przypieta: boolean) {
  const uzytkownik = await wymagajUzytkownika();

  await prisma.notatka.updateMany({
    where: { id, wlascicielId: uzytkownik.id },
    data: { przypieta },
  });

  revalidatePath("/panel/notatki");
  revalidatePath("/panel");
}

export async function usunNotatke(id: string) {
  const uzytkownik = await wymagajUzytkownika();

  await prisma.notatka.deleteMany({ where: { id, wlascicielId: uzytkownik.id } });

  revalidatePath("/panel/notatki");
  revalidatePath("/panel");
  redirect("/panel/notatki");
}
