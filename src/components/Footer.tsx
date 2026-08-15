import { kontakt } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-black py-20 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 md:grid-cols-2">
        <h2 className="text-[32px] font-bold leading-tight md:text-[40px]">
          {kontakt.firma}
        </h2>

        <div className="text-base leading-7">
          <h3 className="mb-4 font-bold">Kontakt</h3>
          <p>
            telefon:{" "}
            <a href={kontakt.telefonHref} className="hover:text-lime">
              {kontakt.telefon}
            </a>
          </p>
          <p>
            @:{" "}
            <a href={`mailto:${kontakt.email}`} className="hover:text-lime">
              {kontakt.email}
            </a>
          </p>
          <p>NIP: {kontakt.nip}</p>
        </div>
      </div>
    </footer>
  );
}
