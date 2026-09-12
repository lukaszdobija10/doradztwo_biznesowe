import type { Metadata } from "next";
import Link from "next/link";

import { signIn } from "@/lib/auth";
import { googleSkonfigurowany } from "@/lib/dostep";

export const metadata: Metadata = {
  title: { absolute: "Logowanie" },
  robots: { index: false, follow: false },
};

const KOMUNIKATY: Record<string, string> = {
  // Auth.js zwraca AccessDenied, gdy callback signIn odrzuci logowanie —
  // u nas znaczy to dokładnie jedno: adres spoza listy PANEL_EMAILS.
  AccessDenied: "Ten adres nie ma dostępu do panelu.",
  Configuration: "Logowanie jest jeszcze nieskonfigurowane po stronie serwera.",
  Verification: "Link wygasł. Spróbuj zalogować się jeszcze raz.",
};

export default async function Logowanie({
  searchParams,
}: {
  searchParams: Promise<{ powrot?: string; error?: string }>;
}) {
  const { powrot, error } = await searchParams;
  const gotowe = googleSkonfigurowany();

  // Przyjmujemy wyłącznie ścieżki wewnątrz serwisu. Bez tego parametr `powrot`
  // byłby otwartym przekierowaniem — wystarczyłby link z cudzym adresem.
  const cel = powrot?.startsWith("/") && !powrot.startsWith("//") ? powrot : "/panel";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-[420px]">
        <Link href="/" className="text-sm text-white/60 hover:text-lime">
          ← Wróć na stronę
        </Link>

        <h1 className="mt-8 text-[32px] font-bold leading-tight text-white">Panel</h1>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          Notatki, zadania i skróty do Twoich narzędzi. Dostęp tylko dla kont
          z listy.
        </p>

        {error && (
          <p className="mt-8 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {KOMUNIKATY[error] ?? "Nie udało się zalogować. Spróbuj ponownie."}
          </p>
        )}

        {gotowe ? (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: cel });
            }}
          >
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-lime px-8 py-4 text-base font-bold text-lime-ink transition-colors hover:bg-lime-bright"
            >
              <LogoGoogle />
              Zaloguj się przez Google
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-lg border border-white/20 bg-white/5 px-5 py-4 text-sm leading-relaxed text-white/70">
            <p className="font-bold text-white">Brakuje danych do logowania Google</p>
            <p className="mt-2">
              Uzupełnij <code className="text-lime">AUTH_GOOGLE_ID</code> i{" "}
              <code className="text-lime">AUTH_GOOGLE_SECRET</code> w pliku{" "}
              <code className="text-lime">.env</code>, a potem uruchom serwer
              jeszcze raz. Instrukcja krok po kroku jest w README.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function LogoGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.3z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.3 15.5 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.3c-.4-1.3-.7-2.7-.7-4.3s.3-3 .7-4.3v-5.7H4.5C2.9 17.2 2 20.5 2 24s.9 6.8 2.5 10l7.3-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.5 2 8.1 6.7 4.5 13.7l7.3 5.7c1.7-5.2 6.5-8.6 12.2-8.6z"
      />
    </svg>
  );
}
