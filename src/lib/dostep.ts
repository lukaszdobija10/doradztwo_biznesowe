/**
 * Kto może wejść do panelu.
 *
 * Samo zalogowanie kontem Google nic nie daje — konto musi jeszcze być na
 * liście w PANEL_EMAILS. Bez tego każdy posiadacz Gmaila miałby konto na
 * stronie, a panel jest prywatnym narzędziem jednej osoby.
 *
 * Pusta lista celowo oznacza „nikt": po pomyłce w konfiguracji lepiej nie
 * wpuścić właściciela niż wpuścić wszystkich.
 */
export function dozwoloneAdresy(): string[] {
  return (process.env.PANEL_EMAILS ?? "")
    .split(",")
    .map((adres) => adres.trim().toLowerCase())
    .filter(Boolean);
}

export function maDostep(email: string | null | undefined): boolean {
  if (!email) return false;
  return dozwoloneAdresy().includes(email.trim().toLowerCase());
}

/** Czy w ogóle da się zalogować, czy brakuje jeszcze danych z Google Cloud. */
export function googleSkonfigurowany(): boolean {
  return Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
}
