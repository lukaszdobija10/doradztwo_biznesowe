# lukaszdobija.pl

Odwzorowanie strony lukaszdobija.pl (obecnie na Zyro/Hostinger) w Next.js.

## Uruchomienie

```bash
npm run dev    # http://localhost:3400
npm run build
npm start      # port 3400
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4

## Struktura

- `src/app/` — strony: `/`, `/o-mnie`, `/sklep`, `/tip4me`, `/crm`, `/kontakt`
- `src/components/` — `Header`, `Footer`, `LogoMarquee`, `ProductCard`, `ContactForm`
- `src/lib/site.ts` — dane kontaktowe, nawigacja, produkty, logotypy
- `public/img`, `public/logos`, `public/produkty` — zdjęcia pobrane z obecnej strony

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
