import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/lib/auth.config";

// Next.js 16 zastąpił konwencję `middleware` konwencją `proxy` — ten sam
// mechanizm, wykonywany zanim żądanie dotrze do aplikacji.
//
// Kod działa w środowisku Edge, dlatego korzysta wyłącznie z konfiguracji bez
// dostępu do bazy: sprawdza jedynie podpis tokenu sesji. Właściwa kontrola
// dostępu (czy adres nadal jest na liście PANEL_EMAILS) odbywa się po stronie
// serwera w src/lib/sesja.ts.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname, search } = req.nextUrl;
  const zalogowany = Boolean(req.auth?.user);

  // Strona sprzedażowa jest publiczna i taka zostaje także dla zalogowanego —
  // to wizytówka firmy, nie ekran startowy aplikacji. Do panelu prowadzi link
  // w nagłówku, nie automatyczne przekierowanie.
  if (!pathname.startsWith("/panel") && pathname !== "/logowanie") {
    return NextResponse.next();
  }

  if (zalogowany && pathname === "/logowanie") {
    return NextResponse.redirect(new URL("/panel", req.nextUrl));
  }

  if (!zalogowany && pathname.startsWith("/panel")) {
    const ekranLogowania = new URL("/logowanie", req.nextUrl);
    // Po zalogowaniu wracamy tam, gdzie użytkownik chciał wejść.
    ekranLogowania.searchParams.set("powrot", `${pathname}${search}`);
    return NextResponse.redirect(ekranLogowania);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Wszystko poza zasobami statycznymi i trasami logowania API. Bez tego
    // wykluczenia proxy przepuszczałoby przez sprawdzanie sesji także obrazki.
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
