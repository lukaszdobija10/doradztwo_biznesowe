import Link from "next/link";

import WierszZadania from "@/components/panel/WierszZadania";
import { dzien } from "@/lib/daty";
import { wymagajUzytkownika } from "@/lib/sesja";
import { aplikacje, notatki, podsumowanie, zadania } from "@/server/dane";

export default async function Panel() {
  const uzytkownik = await wymagajUzytkownika();

  const [liczby, listaZadan, listaNotatek, listaAplikacji] = await Promise.all([
    podsumowanie(uzytkownik.id),
    zadania(uzytkownik.id),
    notatki(uzytkownik.id),
    aplikacje(uzytkownik.id),
  ]);

  const otwarte = listaZadan.filter((zadanie) => zadanie.zrobioneO === null).slice(0, 6);
  const przypiete = listaNotatek.filter((notatka) => notatka.przypieta).slice(0, 4);
  const ostatnie = przypiete.length > 0 ? przypiete : listaNotatek.slice(0, 4);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[32px] font-bold leading-tight">
          Cześć{uzytkownik.imie ? `, ${uzytkownik.imie.split(" ")[0]}` : ""}
        </h1>
        <p className="mt-2 text-black/50">{dzien(new Date())}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Licznik wartosc={liczby.doZrobienia} opis="zadań do zrobienia" />
        <Licznik wartosc={liczby.naDzis} opis="na dziś i zaległych" wyroznij={liczby.naDzis > 0} />
        <Licznik wartosc={liczby.wszystkieNotatki} opis="notatek" />
      </div>

      <Sekcja tytul="Aplikacje" link={{ href: "/panel/aplikacje", label: "Zarządzaj" }}>
        {listaAplikacji.length === 0 ? (
          <Pusto>
            Dodaj skróty do narzędzi, z których korzystasz na co dzień —{" "}
            <Link href="/panel/aplikacje" className="underline hover:text-lime-ink">
              zacznij tutaj
            </Link>
            .
          </Pusto>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {listaAplikacji.map((aplikacja) => (
              <a
                key={aplikacja.id}
                href={aplikacja.adres}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-lime"
              >
                <span className="text-2xl leading-none">{aplikacja.ikona ?? "🔗"}</span>
                <span className="min-w-0">
                  <span className="block font-bold">{aplikacja.nazwa}</span>
                  {aplikacja.opis && (
                    <span className="block truncate text-sm text-black/50">
                      {aplikacja.opis}
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        )}
      </Sekcja>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sekcja tytul="Zadania" link={{ href: "/panel/zadania", label: "Wszystkie" }}>
          {otwarte.length === 0 ? (
            <Pusto>Nic nie czeka. Pusta lista to też wynik.</Pusto>
          ) : (
            <ul className="rounded-xl border border-black/10 bg-white px-4">
              {otwarte.map((zadanie) => (
                <WierszZadania key={zadanie.id} zadanie={zadanie} zUsuwaniem={false} />
              ))}
            </ul>
          )}
        </Sekcja>

        <Sekcja
          tytul={przypiete.length > 0 ? "Przypięte notatki" : "Ostatnie notatki"}
          link={{ href: "/panel/notatki", label: "Wszystkie" }}
        >
          {ostatnie.length === 0 ? (
            <Pusto>Jeszcze żadnej notatki.</Pusto>
          ) : (
            <ul className="space-y-3">
              {ostatnie.map((notatka) => (
                <li key={notatka.id}>
                  <Link
                    href={`/panel/notatki/${notatka.id}`}
                    className="block rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-lime"
                  >
                    <span className="block font-bold">
                      {notatka.przypieta && "📌 "}
                      {notatka.tytul}
                    </span>
                    {notatka.tresc && (
                      <span className="mt-1 block line-clamp-2 text-sm text-black/50">
                        {notatka.tresc}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Sekcja>
      </div>
    </div>
  );
}

function Licznik({
  wartosc,
  opis,
  wyroznij = false,
}: {
  wartosc: number;
  opis: string;
  wyroznij?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 ${
        wyroznij ? "border-lime" : "border-black/10"
      }`}
    >
      <p className="text-[32px] font-bold leading-none">{wartosc}</p>
      <p className="mt-2 text-sm text-black/50">{opis}</p>
    </div>
  );
}

function Sekcja({
  tytul,
  link,
  children,
}: {
  tytul: string;
  link?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-bold">{tytul}</h2>
        {link && (
          <Link href={link.href} className="text-sm text-black/50 hover:text-lime-ink">
            {link.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Pusto({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-black/15 bg-white/50 p-5 text-sm text-black/50">
      {children}
    </p>
  );
}
