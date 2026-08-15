export const kontakt = {
  telefon: "799 177 997",
  telefonHref: "tel:+48799177997",
  email: "kontakt@lukaszdobija.pl",
  nip: "646 285 24 27",
  firma: "Doradztwo Biznesowe Łukasz Dobija",
};

export const nawigacja = [
  { label: "START", href: "/" },
  { label: "O MNIE", href: "/o-mnie" },
  { label: "SKLEP", href: "/sklep" },
  { label: "TIP4ME", href: "/tip4me" },
  { label: "CRM", href: "/crm" },
];

export type Produkt = {
  slug: string;
  nazwa: string;
  cena: number;
  cenaPrzed?: number;
  obraz: string;
  kategoria: "Cyfryzacja" | "Doradztwo i konsulting" | "E-book" | "Szkolenie";
  cta: string;
  meta?: string;
};

export const produkty: Produkt[] = [
  {
    slug: "podrecznik-zarzadzania",
    nazwa: "Podręcznik zarządzania",
    cena: 59,
    cenaPrzed: 79,
    obraz: "/produkty/podrecznik-zarzadzania.png",
    kategoria: "E-book",
    cta: "Dodaj do koszyka",
  },
  {
    slug: "podrecznik-sprzedazy",
    nazwa: "Podręcznik sprzedaży",
    cena: 59,
    cenaPrzed: 79,
    obraz: "/produkty/podrecznik-sprzedazy.png",
    kategoria: "E-book",
    cta: "Dodaj do koszyka",
  },
  {
    slug: "konsultacja-biznesowa",
    nazwa: "Konsultacja biznesowa",
    cena: 299,
    obraz: "/produkty/konsultacja.png",
    kategoria: "Doradztwo i konsulting",
    cta: "Zarezerwuj",
    meta: "90 min",
  },
  {
    slug: "szkolenie-sprzedaz",
    nazwa: "Szkolenie - sprzedaż",
    cena: 499,
    cenaPrzed: 699,
    obraz: "/produkty/szkolenie-sprzedaz.png",
    kategoria: "Szkolenie",
    cta: "Dodaj do koszyka",
  },
  {
    slug: "szkolenie-zarzadzanie",
    nazwa: "Szkolenie - zarządzanie",
    cena: 799,
    obraz: "/produkty/szkolenie-zarzadzanie.png",
    kategoria: "Szkolenie",
    cta: "Dodaj do koszyka",
  },
];

export const kategorie = [
  "Wszystkie produkty",
  "Cyfryzacja",
  "Doradztwo i konsulting",
  "E-book",
  "Szkolenie",
] as const;

export const logotypy = [
  { src: "/logos/moris.png", alt: "Moris" },
  { src: "/logos/upc.png", alt: "UPC Polska" },
  { src: "/logos/orange.png", alt: "Orange Polska" },
  { src: "/logos/superauto.png", alt: "Superauto.pl" },
  { src: "/logos/link-mobility.webp", alt: "Link Mobility" },
  { src: "/logos/logo6.jpg", alt: "Klient" },
  { src: "/logos/logo7.jpg", alt: "Klient" },
];

export function cena(v: number) {
  return `${v.toFixed(2)}zł`;
}
