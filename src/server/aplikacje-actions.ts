"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { wymagajUzytkownika } from "@/lib/sesja";

const schemat = z.object({
  nazwa: z.string().trim().min(1).max(100),
  opis: z.string().trim().max(300).optional(),
  // Tylko http(s). Bez tego w kafelku dałoby się umieścić javascript:…
  adres: z
    .string()
    .trim()
    .url("Adres musi być pełnym linkiem")
    .refine((adres) => /^https?:\/\//i.test(adres), "Dozwolone są tylko adresy http i https"),
  ikona: z.string().trim().max(8).optional(),
});

export async function dodajAplikacje(formData: FormData) {
  const uzytkownik = await wymagajUzytkownika();

  const dane = schemat.safeParse({
    nazwa: formData.get("nazwa"),
    opis: formData.get("opis") || undefined,
    adres: formData.get("adres"),
    ikona: formData.get("ikona") || undefined,
  });
  if (!dane.success) return;

  const ostatnia = await prisma.aplikacja.findFirst({
    where: { wlascicielId: uzytkownik.id },
    orderBy: { kolejnosc: "desc" },
    select: { kolejnosc: true },
  });

  await prisma.aplikacja.create({
    data: {
      ...dane.data,
      kolejnosc: (ostatnia?.kolejnosc ?? 0) + 1,
      wlascicielId: uzytkownik.id,
    },
  });

  revalidatePath("/panel/aplikacje");
  revalidatePath("/panel");
}

export async function usunAplikacje(id: string) {
  const uzytkownik = await wymagajUzytkownika();

  await prisma.aplikacja.deleteMany({ where: { id, wlascicielId: uzytkownik.id } });

  revalidatePath("/panel/aplikacje");
  revalidatePath("/panel");
}
