import { NextResponse, NextRequest } from "next/server";

const PUBLIC_FILE = /(\.(.*)$)/;
const DEFAULT_LOCALE = "en";
const SUPPORTED = new Set(["en", "es"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];
  if (SUPPORTED.has(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };
