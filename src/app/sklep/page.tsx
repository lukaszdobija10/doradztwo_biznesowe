"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cena, kategorie, produkty } from "@/lib/site";

const sortowania = [
  "Domyślne",
  "Cena (od najniższej do najwyższej)",
  "Cena (od najwyższej do najniższej)",
  "Najnowsze",
] as const;

export default function Sklep() {
  const [kategoria, setKategoria] = useState<string>("Wszystkie produkty");
  const [sort, setSort] = useState<(typeof sortowania)[number]>("Domyślne");

  const lista = useMemo(() => {
    const filtrowane =
      kategoria === "Wszystkie produkty"
        ? produkty
        : produkty.filter((p) => p.kategoria === kategoria);

    const kopia = [...filtrowane];
    if (sort === "Cena (od najniższej do najwyższej)") kopia.sort((a, b) => a.cena - b.cena);
    if (sort === "Cena (od najwyższej do najniższej)") kopia.sort((a, b) => b.cena - a.cena);
    if (sort === "Najnowsze") kopia.reverse();
    return kopia;
  }, [kategoria, sort]);

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-8 border-b border-black/10 pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-4 text-sm font-bold">Przeglądaj:</p>
            <div className="flex flex-wrap gap-3">
              {kategorie.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKategoria(k)}
                  className={`rounded-full border px-5 py-2 text-[13px] transition-colors ${
                    kategoria === k
                      ? "border-ink bg-ink text-white"
                      : "border-black/15 hover:border-ink"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-2 md:items-end">
            <span className="text-sm font-bold">Sortuj według:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sortowania)[number])}
              className="rounded-full border border-black/15 px-5 py-2 text-[13px]"
            >
              {sortowania.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-8 text-sm text-muted">
          {lista.length} {lista.length === 1 ? "produkt" : "produkty"}
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <article key={p.slug} className="flex flex-col">
              <div className="mb-5 aspect-square overflow-hidden rounded-2xl bg-[#f3f4f2]">
                <Image
                  src={p.obraz}
                  alt={p.nazwa}
                  width={600}
                  height={600}
                  className="h-full w-full object-contain p-6"
                />
              </div>

              <h2 className="text-base font-bold">{p.nazwa}</h2>

              <p className="mt-2 flex items-baseline gap-2 text-sm">
                {p.cenaPrzed && (
                  <span className="text-muted line-through">{cena(p.cenaPrzed)}</span>
                )}
                <span className="font-bold">{cena(p.cena)}</span>
                {p.meta && <span className="text-muted">{p.meta}</span>}
              </p>

              <Link
                href="/kontakt"
                className="mt-4 self-start rounded-full border border-ink px-6 py-2.5 text-[13px] font-bold transition-colors hover:bg-ink hover:text-white"
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
