'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession } from '@/lib/session';

const USERS = [
  {
    id: 'user_abebe_123',
    username: 'abebe',
    password: 'password123',
    name: 'Abebe Kebede',
    role: 'customer'
  },
  {
    id: 'user_marta_456',
    username: 'marta',
    password: 'password123',
    name: 'Marta Bekele',
    role: 'customer'
  },
  {
    id: 'staff_chef_01',
    username: 'chef',
    password: 'kitchen123',
    name: 'Head Chef Almaz',
    role: 'staff'
  }
];

export async function login(prevState, formData) {
  const username = (formData.get('username') || '').toString().trim().toLowerCase();
  const password = (formData.get('password') || '').toString().trim();
  const rawNext = (formData.get('next') || '').toString();

  const user = USERS.find((u) => u.username === username && u.password === password);

  if (!user) {
    return {
      success: false,
      error: 'Invalid username or password. Try abebe/password123 or chef/kitchen123'
    };
  }

  // Set secure, httpOnly session cookie
  await createSession(user);

  // Exercise 5: Sanitize next parameter to prevent Open Redirect vulnerability
  // Rejects absolute URLs (https://...) and protocol-relative links (//evil.com)
  let safeDestination = '/';
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }

  redirect(safeDestination);
}

export async function logout() {
  await destroySession();
  redirect('/login');
}
