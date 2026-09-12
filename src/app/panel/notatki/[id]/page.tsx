import Link from "next/link";
import { notFound } from "next/navigation";

import { dzien } from "@/lib/daty";
import { wymagajUzytkownika } from "@/lib/sesja";
import { przypnijNotatke, usunNotatke, zapiszNotatke } from "@/server/notatki-actions";
import { notatka as pobierzNotatke } from "@/server/dane";

export default async function Notatka({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uzytkownik = await wymagajUzytkownika();
  const notatka = await pobierzNotatke(uzytkownik.id, id);

  // Cudza notatka wygląda tu tak samo jak nieistniejąca — po odpowiedzi serwera
  // nie da się sprawdzić, czy dane id w ogóle jest w bazie.
  if (!notatka) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/panel/notatki" className="text-sm text-black/50 hover:text-lime-ink">
          ← Notatki
        </Link>

        <div className="flex items-center gap-3">
          <form action={przypnijNotatke.bind(null, notatka.id, !notatka.przypieta)}>
            <button
              type="submit"
              className="rounded-full border border-black/15 px-4 py-2 text-sm transition-colors hover:border-lime"
            >
              {notatka.przypieta ? "Odepnij" : "📌 Przypnij"}
            </button>
          </form>

          <form action={usunNotatke.bind(null, notatka.id)}>
            <button
              type="submit"
              className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/50 transition-colors hover:border-red-500 hover:text-red-600"
            >
              Usuń
            </button>
          </form>
        </div>
      </div>

      <form
        action={zapiszNotatke.bind(null, notatka.id)}
        className="rounded-xl border border-black/10 bg-white p-6"
      >
        <input
          name="tytul"
          required
          maxLength={200}
          defaultValue={notatka.tytul}
          className="w-full border-b border-transparent pb-2 text-2xl font-bold outline-none focus:border-lime"
        />

        <textarea
          name="tresc"
          rows={18}
          defaultValue={notatka.tresc}
          placeholder="Treść notatki…"
          className="mt-4 w-full resize-y leading-relaxed outline-none"
        />

        <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
          <span className="text-xs text-black/35">
            zmieniona {dzien(notatka.zmieniona)}
          </span>
          <button
            type="submit"
            className="rounded-full bg-lime px-8 py-2.5 font-bold text-lime-ink transition-colors hover:bg-lime-bright"
          >
            Zapisz
          </button>
        </div>
      </form>
    </div>
  );
}
