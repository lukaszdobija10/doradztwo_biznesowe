-- CreateEnum
CREATE TYPE "Priorytet" AS ENUM ('NISKI', 'NORMALNY', 'WYSOKI');

-- CreateTable
CREATE TABLE "Uzytkownik" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imie" TEXT,
    "obrazek" TEXT,
    "utworzony" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ostatnieLogowanie" TIMESTAMP(3),

    CONSTRAINT "Uzytkownik_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notatka" (
    "id" TEXT NOT NULL,
    "tytul" TEXT NOT NULL,
    "tresc" TEXT NOT NULL DEFAULT '',
    "przypieta" BOOLEAN NOT NULL DEFAULT false,
    "utworzona" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "zmieniona" TIMESTAMP(3) NOT NULL,
    "wlascicielId" TEXT NOT NULL,

    CONSTRAINT "Notatka_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zadanie" (
    "id" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,
    "priorytet" "Priorytet" NOT NULL DEFAULT 'NORMALNY',
    "termin" DATE,
    "zrobioneO" TIMESTAMP(3),
    "utworzone" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wlascicielId" TEXT NOT NULL,

    CONSTRAINT "Zadanie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplikacja" (
    "id" TEXT NOT NULL,
    "nazwa" TEXT NOT NULL,
    "opis" TEXT,
    "adres" TEXT NOT NULL,
    "ikona" TEXT,
    "kolejnosc" INTEGER NOT NULL DEFAULT 0,
    "wlascicielId" TEXT NOT NULL,

    CONSTRAINT "Aplikacja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Uzytkownik_email_key" ON "Uzytkownik"("email");

-- CreateIndex
CREATE INDEX "Notatka_wlascicielId_przypieta_zmieniona_idx" ON "Notatka"("wlascicielId", "przypieta", "zmieniona");

-- CreateIndex
CREATE INDEX "Zadanie_wlascicielId_zrobioneO_termin_idx" ON "Zadanie"("wlascicielId", "zrobioneO", "termin");

-- CreateIndex
CREATE INDEX "Aplikacja_wlascicielId_kolejnosc_idx" ON "Aplikacja"("wlascicielId", "kolejnosc");

-- AddForeignKey
ALTER TABLE "Notatka" ADD CONSTRAINT "Notatka_wlascicielId_fkey" FOREIGN KEY ("wlascicielId") REFERENCES "Uzytkownik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zadanie" ADD CONSTRAINT "Zadanie_wlascicielId_fkey" FOREIGN KEY ("wlascicielId") REFERENCES "Uzytkownik"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplikacja" ADD CONSTRAINT "Aplikacja_wlascicielId_fkey" FOREIGN KEY ("wlascicielId") REFERENCES "Uzytkownik"("id") ON DELETE CASCADE ON UPDATE CASCADE;
