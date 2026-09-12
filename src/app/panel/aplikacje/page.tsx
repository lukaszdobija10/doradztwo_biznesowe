import type { Metadata } from "next";

import { wymagajUzytkownika } from "@/lib/sesja";
import { dodajAplikacje, usunAplikacje } from "@/server/aplikacje-actions";
import { aplikacje } from "@/server/dane";

export const metadata: Metadata = { title: "Aplikacje" };

export default async function Aplikacje() {
  const uzytkownik = await wymagajUzytkownika();
  const lista = await aplikacje(uzytkownik.id);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-bold leading-tight">Aplikacje</h1>
        <p className="mt-2 text-black/50">
          Skróty do narzędzi, z których korzystasz. Pokazują się na stronie głównej panelu.
        </p>
      </div>

      <form
        action={dodajAplikacje}
        className="grid gap-3 rounded-xl border border-black/10 bg-white p-4 md:grid-cols-[80px_1fr_1fr_auto]"
      >
        <input
          name="ikona"
          maxLength={8}
          placeholder="🔧"
          aria-label="Ikona"
          className="rounded-lg border border-black/15 px-4 py-2.5 text-center outline-none focus:border-lime"
        />
        <input
          name="nazwa"
          required
          maxLength={100}
          placeholder="Nazwa"
          className="rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-lime"
        />
        <input
          name="adres"
          required
          type="url"
          placeholder="https://…"
          className="rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-lime"
        />
        <button
          type="submit"
          className="rounded-full bg-lime px-6 py-2.5 font-bold text-lime-ink transition-colors hover:bg-lime-bright"
        >
          Dodaj
        </button>
        <input
          name="opis"
          maxLength={300}
          placeholder="Krótki opis (opcjonalnie)"
          className="rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-lime md:col-span-4"
        />
      </form>

      {lista.length === 0 ? (
        <p className="rounded-xl border border-dashed border-black/15 p-5 text-sm text-black/50">
          Nie masz jeszcze żadnego skrótu.
        </p>
      ) : (
        <ul className="space-y-3">
          {lista.map((aplikacja) => (
            <li
              key={aplikacja.id}
              className="flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4"
            >
              <span className="text-2xl leading-none">{aplikacja.ikona ?? "🔗"}</span>

              <span className="min-w-0 flex-1">
                <span className="block font-bold">{aplikacja.nazwa}</span>
                <a
                  href={aplikacja.adres}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block truncate text-sm text-black/50 hover:text-lime-ink"
                >
                  {aplikacja.opis ?? aplikacja.adres}
                </a>
              </span>

              <form action={usunAplikacje.bind(null, aplikacja.id)}>
                <button
                  type="submit"
                  className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/50 transition-colors hover:border-red-500 hover:text-red-600"
                >
                  Usuń
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
