import Image from "next/image";
import Link from "next/link";
import LogoMarquee from "@/components/LogoMarquee";
import ProductCard from "@/components/ProductCard";
import ContactForm from "@/components/ContactForm";
import { produkty } from "@/lib/site";

const naStronieGlownej = ["konsultacja-biznesowa", "podrecznik-sprzedazy", "podrecznik-zarzadzania"];

export default function Home() {
  const wyroznione = naStronieGlownej
    .map((slug) => produkty.find((p) => p.slug === slug)!)
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-[38px] font-bold leading-[1.3] text-white md:text-[48px]">
              Twoja droga do sukcesu zaczyna się dzisiaj.
            </h1>
            <p className="mt-8 max-w-[520px] text-lg leading-[1.5] text-white">
              Pomagam właścicielom firm i menedżerom uporządkować proces sprzedaży,
              kanał e-commerce i sposób pracy zespołu, tak, żeby wynik był
              powtarzalny.
            </p>
            <Link
              href="/sklep"
              className="mt-12 inline-block rounded-full bg-lime px-12 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
            >
              Zobacz zakres współpracy
            </Link>
          </div>

          <Image
            src="/img/hero.jpg"
            alt="Łukasz Dobija"
            width={1024}
            height={1196}
            priority
            className="h-[380px] w-full rounded-2xl object-cover md:h-[560px]"
          />
        </div>
      </section>

      {/* O mnie */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mx-auto max-w-[900px] text-center text-[32px] font-bold leading-[1.3] md:text-[48px]">
            Wierzę, że kluczem do rozwoju firmy są ludzie i ich sposób działania.
          </h2>

          <div className="mx-auto mt-12 grid max-w-[1000px] gap-10 text-lg leading-[1.4] md:grid-cols-2">
            <div className="space-y-5">
              <p>
                Specjalizuję się w doradztwie opartym na realnej praktyce. Łączę
                zarządzanie, psychologię biznesu, marketing i doświadczenie
                operacyjne, żeby dostarczać rozwiązania, które działają, a nie tylko
                dobrze wyglądają na prezentacji.
              </p>
              <p>
                Wspieram firmy w budowaniu skutecznych procesów sprzedaży, rozwijaniu
                kanałów e-commerce, tworzeniu zespołów, które dowożą wyniki.
              </p>
            </div>

            <div className="space-y-5">
              <p>
                Swoje doświadczenie zdobywałem, pracując dla marek takich jak Orange,
                UPC Polska, Link Mobility, Superauto.pl a także Moris sp. z o.o.,
                gdzie odpowiadałem za sprzedaż, obsługę klienta i zarządzanie
                zespołami.
              </p>
              <p>
                Ukończyłem studia na Uniwersytecie MERITO oraz WSB w Dąbrowie
                Górniczej, zdobywając dyplom w zakresie sprzedaży i marketingu.
                Odbyłem szkolenie w Akademii Briana Tracy oraz ukończyłem szereg
                szkoleń w zakresie sprzedaży, negocjacji oraz zarządzania.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Problemy + produkty */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="mx-auto max-w-[900px] text-center text-[32px] font-bold leading-[1.3] md:text-[48px]">
            Wynik rzadko spada z jednego powodu.
          </h2>

          <p className="mx-auto mt-10 max-w-[900px] text-center text-lg leading-[1.5]">
            Handlowcy pracują każdy po swojemu, bo nigdy nie ustalono standardu.
            Lejek istnieje w arkuszu, ale nikt nie rozlicza go co tydzień. Kanał
            internetowy generuje ruch, którego nikt nie zamienia w zamówienia.
            Menedżer awansował z najlepszego sprzedawcy i nadal sprzedaje zamiast
            zarządzać. Każdą z tych rzeczy da się naprawić. Wejdź na poziom, który ma
            dla Ciebie sens.
          </p>

          <p className="mt-20 text-center text-2xl font-bold md:text-[32px]">
            Nie każdy problem wymaga projektu doradczego.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {wyroznione.map((p) => (
              <ProductCard key={p.slug} produkt={p} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/sklep"
              className="inline-block rounded-full bg-lime px-12 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
            >
              Sprawdź wszystkie produkty
            </Link>
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="relative bg-ink py-20 md:py-28">
        <Image
          src="/img/kontakt-form.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto grid max-w-[1000px] gap-12 px-6 md:grid-cols-2">
          <h2 className="text-[32px] font-bold leading-tight text-white md:text-[40px]">
            Poznajmy się
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
