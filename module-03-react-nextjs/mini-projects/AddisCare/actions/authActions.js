'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession } from '@/lib/session';

const CLINIC_USERS = [
  {
    id: 'user_abebe_123',
    username: 'abebe',
    password: 'password123',
    name: 'Abebe Kebede',
    role: 'patient'
  },
  {
    id: 'user_marta_456',
    username: 'marta',
    password: 'password123',
    name: 'Marta Bekele',
    role: 'patient'
  },
  {
    id: 'staff_doc_01',
    username: 'dr_tigist',
    password: 'doctor123',
    name: 'Dr. Tigist Assefa',
    role: 'doctor'
  },
  {
    id: 'staff_nurse_01',
    username: 'nurse_selam',
    password: 'nurse123',
    name: 'Nurse Selamawit',
    role: 'staff'
  }
];

export async function login(prevState, formData) {
  const username = (formData.get('username') || '').toString().trim().toLowerCase();
  const password = (formData.get('password') || '').toString().trim();
  const rawNext = (formData.get('next') || '').toString();

  const user = CLINIC_USERS.find((u) => u.username === username && u.password === password);

  if (!user) {
    return {
      success: false,
      error: 'Invalid credentials. Use abebe/password123 (Patient), dr_tigist/doctor123 (Doctor), or nurse_selam/nurse123 (Nurse).'
    };
  }

  // Set secure, HttpOnly session cookie
  await createSession(user);

  // Attack 3 Refusal: Sanitize next parameter to prevent Open Redirect vulnerability.
  // Rejects absolute external URLs (https://...) and protocol-relative links (//evil.com).
  let safeDestination = user.role === 'patient' ? '/portal/appointments' : '/clinic/queue';
  if (rawNext.startsWith('/') && !rawNext.startsWith('//')) {
    safeDestination = rawNext;
  }

  redirect(safeDestination);
}

export async function logout() {
  await destroySession();
  redirect('/login');
}
