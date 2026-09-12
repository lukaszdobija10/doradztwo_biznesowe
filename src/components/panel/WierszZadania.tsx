import { przelaczZadanie, usunZadanie } from "@/server/zadania-actions";
import { termin as etykietaTerminu, zalegle } from "@/lib/daty";
import type { Priorytet } from "@/generated/prisma/enums";

const KOLOR_PRIORYTETU: Record<Priorytet, string> = {
  WYSOKI: "bg-red-100 text-red-700",
  NORMALNY: "bg-black/5 text-black/60",
  NISKI: "bg-black/5 text-black/40",
};

const NAZWA_PRIORYTETU: Record<Priorytet, string> = {
  WYSOKI: "wysoki",
  NORMALNY: "normalny",
  NISKI: "niski",
};

export type ZadanieWiersz = {
  id: string;
  tresc: string;
  priorytet: Priorytet;
  termin: Date | null;
  zrobioneO: Date | null;
};

export default function WierszZadania({
  zadanie,
  zUsuwaniem = true,
}: {
  zadanie: ZadanieWiersz;
  zUsuwaniem?: boolean;
}) {
  const zrobione = zadanie.zrobioneO !== null;
  const poTerminie = !zrobione && zadanie.termin !== null && zalegle(zadanie.termin);

  return (
    <li className="flex items-center gap-3 border-b border-black/5 py-3 last:border-0">
      <form action={przelaczZadanie.bind(null, zadanie.id, !zrobione)}>
        <button
          type="submit"
          aria-label={zrobione ? "Cofnij wykonanie" : "Oznacz jako zrobione"}
          className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
            zrobione
              ? "border-lime bg-lime text-lime-ink"
              : "border-black/25 hover:border-lime"
          }`}
        >
          {zrobione && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      </form>

      <span className={`flex-1 text-[15px] ${zrobione ? "text-black/35 line-through" : ""}`}>
        {zadanie.tresc}
      </span>

      {zadanie.priorytet !== "NORMALNY" && (
        <span
          className={`rounded-full px-2.5 py-1 text-xs ${KOLOR_PRIORYTETU[zadanie.priorytet]}`}
        >
          {NAZWA_PRIORYTETU[zadanie.priorytet]}
        </span>
      )}

      {zadanie.termin && (
        <span
          className={`text-sm ${poTerminie ? "font-bold text-red-600" : "text-black/45"}`}
        >
          {etykietaTerminu(zadanie.termin)}
        </span>
      )}

      {zUsuwaniem && (
        <form action={usunZadanie.bind(null, zadanie.id)}>
          <button
            type="submit"
            aria-label="Usuń zadanie"
            className="text-black/25 transition-colors hover:text-red-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </form>
      )}
    </li>
  );
}
