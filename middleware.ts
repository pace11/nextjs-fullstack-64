import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: 'Mqcx3XY+y0zhJ2NrR24zvw6A+x23NwO42kCbet1Qd9o=',
  })
  const isLoginPage = req.nextUrl.pathname.startsWith('/login')

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  //   matcher: [
  //     /*
  //      * Match all request paths except for the ones starting with:
  //      * - api (API routes)
  //      * - _next/static (static files)
  //      * - _next/image (image optimization files)
  //      * - favicon.ico, sitemap.xml, robots.txt (metadata files)
  //      */
  //     '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  //   ],
  matcher: ['/:path*'],
}
