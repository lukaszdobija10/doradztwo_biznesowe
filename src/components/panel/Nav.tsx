"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const POZYCJE = [
  { label: "Start", href: "/panel" },
  { label: "Notatki", href: "/panel/notatki" },
  { label: "Zadania", href: "/panel/zadania" },
  { label: "Aplikacje", href: "/panel/aplikacje" },
];

export default function Nav() {
  const sciezka = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {POZYCJE.map((pozycja) => {
        const aktywna =
          pozycja.href === "/panel"
            ? sciezka === "/panel"
            : sciezka.startsWith(pozycja.href);

        return (
          <Link
            key={pozycja.href}
            href={pozycja.href}
            className={`text-sm transition-colors ${
              aktywna
                ? "text-lime underline decoration-lime decoration-2 underline-offset-8"
                : "text-white/80 hover:text-lime"
            }`}
          >
            {pozycja.label}
          </Link>
        );
      })}
    </nav>
  );
}
