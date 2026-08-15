import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "O MNIE" };

const doswiadczenie = [
  {
    okres: "10.2024 - obecnie",
    stanowisko: "Konsultant, Dyrektor sprzedaży eCommerce",
    firma: "Moris",
    www: "www.moris.eu",
  },
  {
    okres: "07.2022 - 09.2024",
    stanowisko: "Menadżer zespołu sprzedaży",
    firma: "Superauto",
    www: "www.superauto.pl",
  },
  {
    okres: "12.2021 - 06.2022",
    stanowisko: "Kierownik działu obsługi klienta",
    firma: "Link Mobility",
    www: "www.smsapi.pl",
  },
  {
    okres: "08.2015 - 11.2021",
    stanowisko: "Kierownik zespołu sprzedaży",
    firma: "UPC Polska",
    www: "www.play.pl",
  },
  {
    okres: "01.2013 - 07.2015",
    stanowisko: "Kierownik salonu Orange",
    firma: "Orange Polska",
    www: "www.orange.pl",
  },
  {
    okres: "04.2010 - 01.2013",
    stanowisko: "Konsultant ds. obsługi klienta",
    firma: "Orange Polska",
    www: "www.orange.pl",
  },
];

const edukacja = [
  "10.2025 - 06.2026 — Akademia WSB. Negocjacje w biznesie",
  "10.2024 - 06.2025 — Akademia WSB. Business Development. Coaching, konsulting, mentoring",
  "10.2020 - 07.2023 — Uniwersytet WSB MERITO. Zarządzanie, Sprzedaż i marketing",
];

const szkolenia = [
  "Brian Tracy International — Master Class Sales Leaders Academy",
  "Sell Wise Szymon Negacz — Machina B2B, Lead Generation, Prospecting i sprzedaż, Strategia i procesy, Zarządzanie zespołem",
];

const galeria = [
  { src: "/img/g1.jpg", w: 1600, h: 1200 },
  { src: "/img/g2.jpg", w: 1536, h: 2048 },
  { src: "/img/g3.jpg", w: 1600, h: 1200 },
  { src: "/img/g4.jpg", w: 1600, h: 1108 },
  { src: "/img/g5.jpg", w: 1600, h: 2133 },
];

export default function OMnie() {
  return (
    <>
      <section className="bg-ink py-12 md:py-16">
        <Image
          src="/img/o-mnie-hero.jpg"
          alt="Łukasz Dobija"
          width={1367}
          height={2048}
          priority
          className="mx-auto h-auto w-auto max-h-[75vh] max-w-full rounded-2xl object-contain px-6"
        />
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] px-6">
          <h1 className="text-[32px] font-bold md:text-[48px]">Doświadczenie</h1>

          <ul className="mt-10 divide-y divide-black/10">
            {doswiadczenie.map((p) => (
              <li key={`${p.okres}-${p.firma}`} className="grid gap-2 py-6 md:grid-cols-[220px_1fr]">
                <span className="text-base text-muted">{p.okres}</span>
                <span>
                  <span className="block text-lg font-bold">{p.stanowisko}</span>
                  <span className="text-base text-muted">
                    {p.firma}, {p.www}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-20 text-[28px] font-bold md:text-[40px]">Edukacja</h2>
          <ul className="mt-8 space-y-4 text-lg">
            {edukacja.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>

          <h2 className="mt-20 text-[28px] font-bold md:text-[40px]">Szkolenia i kursy</h2>
          <ul className="mt-8 space-y-4 text-lg">
            {szkolenia.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="mx-auto max-w-[1200px] columns-1 gap-4 px-6 sm:columns-2 lg:columns-3">
          {galeria.map((foto) => (
            <Image
              key={foto.src}
              src={foto.src}
              alt=""
              width={foto.w}
              height={foto.h}
              className="mb-4 w-full rounded-2xl"
            />
          ))}
        </div>
      </section>
    </>
  );
}
