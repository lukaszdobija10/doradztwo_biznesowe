import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "CRM" };

const CRM_URL = "https://www.crm.lddb.pl/";

const funkcje = [
  {
    tytul: "Baza klientów",
    opis: "Firmy i osoby prywatne, dane kontaktowe, NIP, osoby decyzyjne. Do każdego klienta historia rozmów, telefonów i spotkań — zapisana wtedy, gdy się wydarzyła, a nie odtwarzana z pamięci pół roku później.",
  },
  {
    tytul: "Pipeline sprzedaży",
    opis: "Tablica z etapami, przez które przechodzą Twoje szanse. Przeciągasz kartę, gdy rozmowa idzie dalej. Widzisz wartość całego lejka i ile z niej realnie możesz się spodziewać po uwzględnieniu prawdopodobieństwa.",
  },
  {
    tytul: "Zadania",
    opis: "Terminy, priorytety, przypisanie do osoby. Widok listy albo tablicy. Każde zadanie da się powiązać z klientem i szansą, więc zawsze wiadomo, po co się je robi.",
  },
  {
    tytul: "Zgłoszenia",
    opis: "Sprawy od klientów z własną numeracją i statusem. Wątek odpowiedzi z podziałem na to, co widzi klient, i notatki wewnętrzne dla zespołu.",
  },
  {
    tytul: "Notatki",
    opis: "Foldery, formatowanie, listy do odhaczania. Notatkę podpinasz do klienta albo zadania — i widać ją z obu stron. Ustalenia przestają ginąć w mailach.",
  },
  {
    tytul: "Cele",
    opis: "Przychód, liczba klientów, wykonane zadania. Wynik liczy się sam z danych w systemie, wpisujesz go ręcznie albo odhaczasz kroki — zależnie od tego, co mierzysz.",
  },
];

export default function Crm() {
  return (
    <>
      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto grid max-w-[1000px] items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h1 className="text-[32px] font-bold leading-[1.3] text-white md:text-[48px]">
              CRM dla micro przedsiębiorców
            </h1>
            <a
              href={CRM_URL}
              className="mt-10 inline-block rounded-full bg-lime px-12 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
            >
              SPRAWDŹ
            </a>
          </div>

          <Image
            src="/img/crm-lockup.png"
            alt="CRM"
            width={750}
            height={924}
            priority
            className="mx-auto w-full max-w-[360px] object-contain"
          />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="text-center text-[32px] font-bold leading-[1.3] md:text-[48px]">
            Sześć rzeczy, które robisz codziennie
          </h2>
          <p className="mt-6 text-center text-lg">
            Wszystkie w jednym miejscu i połączone ze sobą.
          </p>

          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {funkcje.map((f) => (
              <article key={f.tytul}>
                <h3 className="text-xl font-bold">{f.tytul}</h3>
                <p className="mt-4 text-base leading-[1.6]">{f.opis}</p>
              </article>
            ))}
          </div>

          <div className="mt-20 text-center">
            <a
              href={CRM_URL}
              className="inline-block rounded-full bg-lime px-12 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
            >
              SPRAWDŹ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
