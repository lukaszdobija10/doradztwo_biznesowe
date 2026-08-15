import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "TIP4ME" };

export default function Tip4me() {
  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <h1 className="text-[32px] font-bold leading-[1.3] md:text-[48px]">
            Nikt już nie nosi gotówki,
            <br />
            ale napiwki właśnie wróciły.
          </h1>

          <p className="mx-auto mt-10 max-w-[760px] text-lg leading-[1.5]">
            TIP4ME to bezgotówkowy napiwek i ocena jakości obsługi w jednym. Gość
            skanuje kod QR przy stoliku, wybiera osobę i kwotę, płaci telefonem i
            zostawia opinię, bez instalowania czegokolwiek.
          </p>

          <p className="mx-auto mt-6 max-w-[760px] text-lg leading-[1.5]">
            TIP4ME to moje autorskie narzędzie, które wspiera pracowników i
            właścicieli miejsc usługowych.
          </p>

          <a
            href="https://tip4me.pl"
            className="mt-12 inline-block rounded-full bg-lime px-12 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
          >
            Sprawdź to!
          </a>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <Image
            src="/img/tip4me.png"
            alt="TIP4ME"
            width={2800}
            height={929}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>
    </>
  );
}
