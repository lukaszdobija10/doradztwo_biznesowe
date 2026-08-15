import Image from "next/image";
import { cena, type Produkt } from "@/lib/site";

export default function ProductCard({
  produkt,
  zPrzyciskiem = false,
}: {
  produkt: Produkt;
  zPrzyciskiem?: boolean;
}) {
  return (
    <article className="flex flex-col">
      <div className="mb-5 aspect-square overflow-hidden rounded-2xl bg-[#f3f4f2]">
        <Image
          src={produkt.obraz}
          alt={produkt.nazwa}
          width={600}
          height={600}
          className="h-full w-full object-contain p-6"
        />
      </div>

      <h3 className="text-base font-bold">{produkt.nazwa}</h3>

      <p className="mt-2 flex items-baseline gap-2 text-sm">
        {produkt.cenaPrzed && (
          <span className="text-muted line-through">{cena(produkt.cenaPrzed)}</span>
        )}
        <span className="font-bold">{cena(produkt.cena)}</span>
        {produkt.meta && <span className="text-muted">{produkt.meta}</span>}
      </p>

      {zPrzyciskiem && (
        <button
          type="button"
          className="mt-4 self-start rounded-full border border-ink px-6 py-2.5 text-[13px] font-bold transition-colors hover:bg-ink hover:text-white"
        >
          {produkt.cta}
        </button>
      )}
    </article>
  );
}
