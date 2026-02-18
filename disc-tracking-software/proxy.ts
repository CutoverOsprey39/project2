import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  
  const isTrackerRoute = nextUrl.pathname.startsWith('/dashboard')
  const isAuthRoute = nextUrl.pathname.startsWith('/sign-in') || nextUrl.pathname.startsWith('/create-account')

  // Redirect to tracker if logged in and trying to access auth routes or home page
  if (isLoggedIn && (isAuthRoute || nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl))
  }

  // Redirect to sign-in if accessing tracker route while not logged in
  if (!isLoggedIn && isTrackerRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

