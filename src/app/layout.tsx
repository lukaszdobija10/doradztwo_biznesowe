import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={roboto.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
