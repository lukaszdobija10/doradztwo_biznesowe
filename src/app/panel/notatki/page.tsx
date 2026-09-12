import type { Metadata } from "next";
import Link from "next/link";

import { dzien } from "@/lib/daty";
import { wymagajUzytkownika } from "@/lib/sesja";
import { dodajNotatke } from "@/server/notatki-actions";
import { notatki } from "@/server/dane";

export const metadata: Metadata = { title: "Notatki" };

export default async function Notatki() {
  const uzytkownik = await wymagajUzytkownika();
  const lista = await notatki(uzytkownik.id);

  return (
    <div className="space-y-8">
      <h1 className="text-[32px] font-bold leading-tight">Notatki</h1>

      <form
        action={dodajNotatke}
        className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 sm:flex-row"
      >
        <input
          name="tytul"
          required
          maxLength={200}
          placeholder="Tytuł nowej notatki"
          className="flex-1 rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-lime"
        />
        <button
          type="submit"
          className="rounded-full bg-lime px-6 py-2.5 font-bold text-lime-ink transition-colors hover:bg-lime-bright"
        >
          Utwórz
        </button>
      </form>

      {lista.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/15 p-5 text-sm text-black/50">
          Jeszcze żadnej notatki.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {lista.map((notatka) => (
            <li key={notatka.id}>
              <Link
                href={`/panel/notatki/${notatka.id}`}
                className="flex h-full flex-col rounded-xl border border-black/10 bg-white p-5 transition-colors hover:border-lime"
              >
                <span className="font-bold">
                  {notatka.przypieta && "📌 "}
                  {notatka.tytul}
                </span>
                {notatka.tresc && (
                  <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/55">
                    {notatka.tresc}
                  </span>
                )}
                <span className="mt-4 text-xs text-black/35">
                  zmieniona {dzien(notatka.zmieniona)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
