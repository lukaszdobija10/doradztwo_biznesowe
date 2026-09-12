# lukaszdobija.pl

Strona wizytówkowa (odwzorowanie wersji z Zyro/Hostinger) plus prywatny panel
właściciela: notatki, zadania i skróty do aplikacji.

## Uruchomienie

```bash
./scripts/baza-lokalna.sh start   # PostgreSQL na 127.0.0.1:55432
npm run dev                       # http://localhost:3400
```

Pierwsze uruchomienie: `cp .env.example .env`, uzupełnić, `npm run db:migrate`.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 ·
Prisma 7 + PostgreSQL · Auth.js v5 (logowanie Google)

## Struktura

- `src/app/(strona)/` — część publiczna: `/`, `/o-mnie`, `/sklep`, `/tip4me`, `/crm`, `/kontakt`
- `src/app/panel/` — część prywatna: start, notatki, zadania, aplikacje
- `src/app/logowanie/` — ekran logowania Google
- `src/proxy.ts` — odsiewa niezalogowanych, zanim żądanie dotrze do `/panel`
- `src/lib/sesja.ts` — warstwa dostępu do danych; każde zapytanie panelu idzie tędy
- `src/server/` — akcje serwerowe (zapisy) i odczyty panelu
- `prisma/schema.prisma` — model danych
- `src/lib/site.ts` — dane kontaktowe, nawigacja, produkty, logotypy

## Logowanie Google — co trzeba zrobić raz

Panel wpuszcza wyłącznie adresy wypisane w `PANEL_EMAILS`. Samo konto Google
nie wystarcza, więc nawet po wycieku linku nikt obcy nie wejdzie.

1. [Google Cloud Console](https://console.cloud.google.com/) → utwórz projekt
   (albo wybierz istniejący).
2. **APIs & Services → OAuth consent screen**: typ **External**, nazwa aplikacji,
   e-mail kontaktowy. Ekran może zostać w trybie *Testing* — wtedy dodaj swój
   adres w sekcji **Test users**.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**,
   typ **Web application**. W **Authorized redirect URIs** wpisz:
   - `http://localhost:3400/api/auth/callback/google` — do pracy lokalnej
   - `https://lukaszdobija.pl/api/auth/callback/google` — po wdrożeniu
4. Skopiuj *Client ID* i *Client secret* do `.env` jako `AUTH_GOOGLE_ID`
   i `AUTH_GOOGLE_SECRET`, a swój adres e-mail do `PANEL_EMAILS`.
5. Zrestartuj `npm run dev`.

Dopóki tych dwóch zmiennych nie ma, `/logowanie` zamiast martwego przycisku
pokazuje komunikat, czego brakuje.

## Baza

Lokalnie korzystamy z tego samego klastra PostgreSQL co CRM
(`~/.local/pgdata-crm`, port 55432), ale w osobnej bazie `panel_dev` i pod
osobną rolą `panel`.

```bash
npm run db:migrate   # zmiana schematu + migracja
npm run db:studio    # podgląd danych
npm run db:deploy    # migracje na produkcji
```

## Tokeny designu (`src/app/globals.css`)

| token | wartość |
| --- | --- |
| `--color-ink` | `#1d1e20` — ciemne sekcje |
| `--color-lime` | `#aadb17` — przyciski |
| `--color-lime-bright` | `#c1f325` — hover / przycisk formularza |
| `--color-lime-ink` | `#0a1310` — tekst na limonce |
| `--color-muted` | `#5e6266` — ceny przekreślone, daty |

Font: Roboto (`next/font/google`), nagłówki 48/40 px bold, tekst 18 px.

## Do zrobienia

- Formularze kontaktowe otwierają klienta poczty (`mailto:`) — do podmiany na backend, gdy będzie wybrany dostawca.
- Sklep jest wyłącznie prezentacyjny: przyciski „Dodaj do koszyka" / „Zarezerwuj" prowadzą do `/kontakt`. Koszyk i płatności czekają na decyzję o bramce.
- Panel nie jest jeszcze nigdzie wdrożony — strona żyje na Zyro, a to repozytorium chodzi lokalnie.
