import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData } from './lib/session';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Only protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return response;
    }

    try {
      const session = await getIronSession<SessionData>(
        request,
        response,
        {
          password: process.env.SESSION_SECRET!,
          cookieName: 'niraj-wallpapers-session',
          cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
            maxAge: undefined,
          },
        }
      );

      if (!session.isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: '/admin/:path*',
};