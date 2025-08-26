import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const ispublicPath = path === '/login' || path === '/register'|| path === '/';
    const token = request.cookies.get("accessToken")?.value;

    if (!ispublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (ispublicPath && token) {
        return NextResponse.redirect(new URL("/dashboard",request.url))
    }
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard',
  ],
}