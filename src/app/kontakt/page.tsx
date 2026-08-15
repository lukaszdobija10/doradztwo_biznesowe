import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { kontakt } from "@/lib/site";

export const metadata: Metadata = { title: "Darmowa Konsultacja - Skontaktuj się" };

export default function Kontakt() {
  return (
    <section className="relative bg-ink py-20 md:py-28">
      <Image src="/img/kontakt-bg.jpg" alt="" fill className="object-cover opacity-30" />

      <div className="relative mx-auto grid max-w-[1000px] gap-12 px-6 md:grid-cols-2">
        <div>
          <h1 className="text-[32px] font-bold leading-tight text-white md:text-[48px]">
            Skontaktuj się
          </h1>
          <p className="mt-6 text-lg leading-[1.5] text-white">
            porozmawiamy o Twoich problemach, potrzebach biznesowych oraz wybierzemy
            narzędzia, których potrzebujesz.
          </p>
          <a
            href={`mailto:${kontakt.email}`}
            className="mt-10 inline-block text-lg text-lime hover:underline"
          >
            {kontakt.email}
          </a>
        </div>

        <ContactForm cta="Wyślij zapytanie" />
      </div>
    </section>
  );
}
