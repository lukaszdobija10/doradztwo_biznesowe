import type { Metadata } from "next";

import WierszZadania from "@/components/panel/WierszZadania";
import { wymagajUzytkownika } from "@/lib/sesja";
import { dodajZadanie } from "@/server/zadania-actions";
import { zadania } from "@/server/dane";

export const metadata: Metadata = { title: "Zadania" };

export default async function Zadania() {
  const uzytkownik = await wymagajUzytkownika();
  const lista = await zadania(uzytkownik.id);

  const doZrobienia = lista.filter((zadanie) => zadanie.zrobioneO === null);
  const zrobione = lista.filter((zadanie) => zadanie.zrobioneO !== null);

  return (
    <div className="space-y-8">
      <h1 className="text-[32px] font-bold leading-tight">Zadania</h1>

      <form
        action={dodajZadanie}
        className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center"
      >
        <input
          name="tresc"
          required
          maxLength={500}
          placeholder="Co trzeba zrobić?"
          className="flex-1 rounded-lg border border-black/15 px-4 py-2.5 outline-none focus:border-lime"
        />
        <select
          name="priorytet"
          defaultValue="NORMALNY"
          aria-label="Priorytet"
          className="rounded-lg border border-black/15 px-3 py-2.5 outline-none focus:border-lime"
        >
          <option value="NISKI">niski</option>
          <option value="NORMALNY">normalny</option>
          <option value="WYSOKI">wysoki</option>
        </select>
        <input
          type="date"
          name="termin"
          aria-label="Termin"
          className="rounded-lg border border-black/15 px-3 py-2.5 outline-none focus:border-lime"
        />
        <button
          type="submit"
          className="rounded-full bg-lime px-6 py-2.5 font-bold text-lime-ink transition-colors hover:bg-lime-bright"
        >
          Dodaj
        </button>
      </form>

      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-black/40">
          Do zrobienia ({doZrobienia.length})
        </h2>
        {doZrobienia.length === 0 ? (
          <p className="rounded-xl border border-dashed border-black/15 p-5 text-sm text-black/50">
            Pusto. Wszystko odhaczone.
          </p>
        ) : (
          <ul className="rounded-xl border border-black/10 bg-white px-4">
            {doZrobienia.map((zadanie) => (
              <WierszZadania key={zadanie.id} zadanie={zadanie} />
            ))}
          </ul>
        )}
      </section>

      {zrobione.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-black/40">
            Zrobione ({zrobione.length})
          </h2>
          <ul className="rounded-xl border border-black/10 bg-white px-4">
            {zrobione.map((zadanie) => (
              <WierszZadania key={zadanie.id} zadanie={zadanie} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
