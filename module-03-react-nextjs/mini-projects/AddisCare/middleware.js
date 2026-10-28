import { NextResponse } from 'next/server';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'addiscare_session';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  let session = null;
  if (sessionCookie?.value) {
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
      session = JSON.parse(decoded);
    } catch (e) {
      session = null;
    }
  }

  // 1. Patient Protected Routes: /portal, /book
  const isPatientProtected = pathname.startsWith('/portal') || pathname.startsWith('/book');
  if (isPatientProtected && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Staff Protected Routes: /clinic
  const isStaffProtected = pathname.startsWith('/clinic');
  if (isStaffProtected) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (session.role !== 'doctor' && session.role !== 'staff') {
      return new NextResponse(
        JSON.stringify({ error: 'Forbidden', message: 'Clinic Portal access requires an authorized medical license or nurse role.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/book/:path*',
    '/clinic/:path*'
  ]
};
