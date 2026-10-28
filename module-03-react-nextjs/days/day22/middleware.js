import { NextResponse } from 'next/server';

/**
 * Exercise 3 & Requirements:
 * Middleware with a narrow matcher protecting ONLY private routes.
 * Never runs on static assets, images, or public routes.
 */
export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*']
};

export function middleware(request) {
  const sessionCookie = request.cookies.get('addis_session');
  let session = null;

  if (sessionCookie?.value) {
    try {
      session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
      if (session.expiresAt && Date.now() > session.expiresAt) {
        session = null;
      }
    } catch {
      session = null;
    }
  }

  const { pathname, search } = request.nextUrl;
  const currentDestination = `${pathname}${search}`;

  // 1. Signed-out visitor protection
  if (!session) {
    // Exercise 4 & 5: Validate next parameter to prevent Open Redirect attacks.
    // Must start with a single slash '/' and NEVER start with '//' (protocol-relative URLs)
    const isValidNext = currentDestination.startsWith('/') && !currentDestination.startsWith('//');
    const safeNext = isValidNext ? currentDestination : '/';

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', safeNext);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Exercise 7: Staff-only /kitchen route protection
  if (pathname.startsWith('/kitchen') && session.role !== 'staff') {
    // Refuse access server-side
    return new NextResponse('403 Forbidden — Staff access only.', {
      status: 403,
      headers: { 'content-type': 'text/plain' }
    });
  }

  return NextResponse.next();
}
