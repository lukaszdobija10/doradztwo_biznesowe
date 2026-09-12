import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lukaszdobija.pl"),
  title: {
    default:
      "Usługi Konsultingowe i Szkolenia z Zarządzania | doradztwo biznesowe, konsulting biznesowy, e-commerce, sprzedaż i zarządzanie",
    template:
      "%s | doradztwo biznesowe, konsulting biznesowy, e-commerce, sprzedaż i zarządzanie",
  },
  description:
    "Pomagam właścicielom firm i menedżerom uporządkować proces sprzedaży, kanał e-commerce i sposób pracy zespołu, tak, żeby wynik był powtarzalny.",
};

// Nagłówek i stopka strony wizytówkowej siedzą w layoucie grupy (strona).
// Panel ma własną nawigację i nie dziedziczy tamtej — stąd podział na grupy
// zamiast jednego wspólnego layoutu.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={roboto.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
