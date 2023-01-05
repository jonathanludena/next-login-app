import { NextRequest, NextResponse } from "next/server";

import { validateToken } from "./services/validateToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (token === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    const data = validateToken(String(token));
    if (!data) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
}

// filter routes include in guard routes
export const config = {
  matcher: ["/dashboard", "/"],
};
