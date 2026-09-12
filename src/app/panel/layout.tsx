import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Nav from "@/components/panel/Nav";
import { signOut } from "@/lib/auth";
import { wymagajUzytkownika } from "@/lib/sesja";

export const metadata: Metadata = {
  // `absolute` zamiast `default`: panel nie dokleja do tytułu ogona
  // z pozycjonowania strony wizytówkowej.
  title: { absolute: "Panel", template: "%s · Panel" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Sprawdzenie jest tutaj, a mimo to powtarza się w każdej akcji zapisu.
  // Layout nie chroni Server Actions — te wywoływane są bezpośrednio,
  // z pominięciem drzewa komponentów.
  const uzytkownik = await wymagajUzytkownika();

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6f4]">
      <header className="bg-ink">
        <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-10">
            <Link href="/panel" className="text-base font-bold text-white">
              Panel
            </Link>
            <div className="hidden md:block">
              <Nav />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm text-white/60 hover:text-lime sm:block">
              Strona
            </Link>

            {uzytkownik.obrazek && (
              <Image
                src={uzytkownik.obrazek}
                alt=""
                width={32}
                height={32}
                className="rounded-full"
                unoptimized
              />
            )}

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-full border border-white/25 px-4 py-2 text-sm text-white transition-colors hover:border-lime hover:text-lime"
              >
                Wyloguj
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-3 md:hidden">
          <Nav />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
