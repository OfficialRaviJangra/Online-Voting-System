import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./helpers/token.helper";


export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const url = request.nextUrl.pathname;

  const isPublicPath = url === "/login" || url === "/register" || url === "/";

  const user = verifyToken(token!) as { id: string; role: string; };

  try {
    if(isPublicPath && !token) {
      return NextResponse.next();
    }
    
    if (isPublicPath && token) {
      if(user?.role === "voter"){
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (isPublicPath && token) {
      if(user?.role === "admin"){
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard',
    '/admin/:path*',
  ],
}