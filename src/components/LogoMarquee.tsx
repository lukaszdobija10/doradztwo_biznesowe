import Image from "next/image";
import { logotypy } from "@/lib/site";

export default function LogoMarquee() {
  const seria = [...logotypy, ...logotypy];

  return (
    <section className="overflow-hidden bg-white py-10">
      <div className="flex w-max animate-marquee items-center gap-16 px-8">
        {seria.map((logo, i) => (
          <Image
            key={`${logo.src}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={220}
            height={100}
            className="h-[70px] w-auto object-contain opacity-80"
          />
        ))}
      </div>
    </section>
  );
}
