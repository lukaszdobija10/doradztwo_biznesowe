"use client";

import { useState } from "react";
import { kontakt } from "@/lib/site";

export default function ContactForm({ cta = "Wyślij wiadomość" }: { cta?: string }) {
  const [imie, setImie] = useState("");
  const [email, setEmail] = useState("");
  const [wiadomosc, setWiadomosc] = useState("");

  function wyslij(e: React.FormEvent) {
    e.preventDefault();
    const tresc = `Imię: ${imie}\nE-mail: ${email}\n\n${wiadomosc}`;
    window.location.href = `mailto:${kontakt.email}?subject=${encodeURIComponent(
      `Zapytanie ze strony — ${imie}`,
    )}&body=${encodeURIComponent(tresc)}`;
  }

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-5">
      <Pole label="Twoje imię*" value={imie} onChange={setImie} required />
      <Pole
        label="Twój adres e-mail*"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />

      <label className="flex flex-col gap-2">
        <span className="text-sm text-white">Wiadomość*</span>
        <textarea
          required
          rows={5}
          value={wiadomosc}
          onChange={(e) => setWiadomosc(e.target.value)}
          className="rounded-lg border border-white/25 bg-transparent px-4 py-3 text-white outline-none focus:border-lime"
        />
      </label>

      <button
        type="submit"
        className="mt-2 self-start rounded-full bg-lime-bright px-10 py-4 text-[13px] font-bold text-lime-ink transition-colors hover:bg-lime"
      >
        {cta}
      </button>
    </form>
  );
}

function Pole({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-white">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-white/25 bg-transparent px-4 py-3 text-white outline-none focus:border-lime"
      />
    </label>
  );
}
