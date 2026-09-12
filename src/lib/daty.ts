const DZIEN = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const KROTKO = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });

export function dzien(data: Date): string {
  return DZIEN.format(data);
}

export function krotko(data: Date): string {
  return KROTKO.format(data);
}

/** Etykieta terminu zadania: „dziś", „jutro", „wczoraj" albo data. */
export function termin(data: Date): string {
  const dzis = new Date();
  const roznica = Math.round(
    (odciecie(data).getTime() - odciecie(dzis).getTime()) / 86_400_000,
  );

  if (roznica === 0) return "dziś";
  if (roznica === 1) return "jutro";
  if (roznica === -1) return "wczoraj";
  return krotko(data);
}

/** Czy termin już minął (dzisiejszy jeszcze nie). */
export function zalegle(data: Date): boolean {
  return odciecie(data).getTime() < odciecie(new Date()).getTime();
}

function odciecie(data: Date): Date {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate());
}
