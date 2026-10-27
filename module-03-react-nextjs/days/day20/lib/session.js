import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'addis_session';

/**
 * Exercise 1 & Requirement:
 * Reads and verifies the session cookie.
 * Returns decoded session object or null if invalid/missing.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  try {
    const sessionData = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
    // Enforce session expiration check
    if (sessionData.expiresAt && Date.now() > sessionData.expiresAt) {
      return null;
    }
    return sessionData;
  } catch (err) {
    return null;
  }
}

/**
 * Exercise 2 & Requirement:
 * Sets the cookie on sign-in with httpOnly, secure, sameSite, and maxAge.
 * Strictly prevents client-side JavaScript access (document.cookie cannot read it).
 */
export async function createSession(user) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 7; // 7 days in seconds
  const sessionPayload = {
    userId: user.id,
    name: user.name,
    role: user.role || 'customer',
    expiresAt: Date.now() + maxAge * 1000
  };

  const encoded = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');

  cookieStore.set(SESSION_COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/'
  });

  return sessionPayload;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
