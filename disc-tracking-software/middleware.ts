import { auth } from "./auth"

export default auth((req) => {
  // If the user is NOT logged in and is trying to access /dashboard or deeper
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard") || 
                      req.nextUrl.pathname.startsWith("/tracker")
  
  if (isDashboard && !req.auth) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  // Matcher ignoring static files and api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
