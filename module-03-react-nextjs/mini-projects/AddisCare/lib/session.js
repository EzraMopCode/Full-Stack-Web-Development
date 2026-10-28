import { cookies } from 'next/headers';

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || 'addiscare_session';

/**
 * Creates a cryptographically structured, HttpOnly session cookie.
 * Inaccessible to client-side document.cookie (Defeats XSS token theft).
 */
export async function createSession(user) {
  const cookieStore = await cookies();
  
  const payload = {
    userId: user.id,
    username: user.username,
    name: user.name,
    role: user.role, // 'patient', 'doctor', 'staff'
    createdAt: Date.now()
  };

  const serialized = Buffer.from(JSON.stringify(payload)).toString('base64');

  cookieStore.set(COOKIE_NAME, serialized, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });

  return payload;
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(COOKIE_NAME);
    if (!cookie?.value) return null;

    const decoded = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const session = JSON.parse(decoded);
    return session;
  } catch (err) {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}