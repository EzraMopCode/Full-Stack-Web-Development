'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './Providers';

export default function Header() {
  const pathname = usePathname();
  const { staff, signOut } = useAuth();

  return (
    <header>
      <Link href="/" className="brand">
        Clinic Diary
      </Link>
      <nav>
        <Link href="/diary" className={pathname === '/diary' ? 'active' : ''}>
          Diary
        </Link>
        <Link href="/book" className={pathname === '/book' ? 'active' : ''}>
          Book
        </Link>
        {staff ? (
          <button className="link-btn" onClick={signOut}>
            Sign out ({staff.name})
          </button>
        ) : (
          <Link href="/login" className={pathname === '/login' ? 'active' : ''}>
            Staff sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
