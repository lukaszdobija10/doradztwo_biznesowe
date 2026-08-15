"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nawigacja } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [otwarte, setOtwarte] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-[17px] font-bold text-white"
          onClick={() => setOtwarte(false)}
        >
          Łukasz Dobija - Doradztwo Biznesowe
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nawigacja.map((item) => {
            const aktywny =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] tracking-wide transition-colors ${
                  aktywny
                    ? "text-lime underline decoration-lime decoration-2 underline-offset-8"
                    : "text-white hover:text-lime"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <span className="flex items-center gap-2 text-[13px] text-white">
            <CartIcon />
            Koszyk
          </span>

          <Link
            href="/kontakt"
            className="rounded-full bg-lime px-7 py-3 text-[13px] font-bold text-lime-ink transition-colors hover:bg-lime-bright"
          >
            Bezpłatna wycena
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={otwarte}
          onClick={() => setOtwarte((v) => !v)}
          className="text-white lg:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {otwarte ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {otwarte && (
        <nav className="border-t border-white/10 bg-ink px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col gap-5">
            {nawigacja.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOtwarte(false)}
                  className="text-sm tracking-wide text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/kontakt"
            onClick={() => setOtwarte(false)}
            className="mt-6 inline-block rounded-full bg-lime px-7 py-3 text-[13px] font-bold text-lime-ink"
          >
            Bezpłatna wycena
          </Link>
        </nav>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
