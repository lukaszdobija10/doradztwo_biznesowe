import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

// Next.js przeładowuje moduły przy każdej zmianie pliku w trybie deweloperskim.
// Bez tego cache'u każde przeładowanie tworzyłoby nową pulę połączeń i szybko
// wyczerpałoby limit połączeń PostgreSQL.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function utworzKlienta() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Brak zmiennej DATABASE_URL. Skopiuj .env.example do .env i uzupełnij połączenie do bazy.",
    );
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? utworzKlienta();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
