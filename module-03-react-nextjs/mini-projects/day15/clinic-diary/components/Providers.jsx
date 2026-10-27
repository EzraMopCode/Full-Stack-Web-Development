'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [staff, setStaff] = useState({ name: 'Dr. Abebe' });

  const value = useMemo(
    () => ({
      staff,
      signIn: (name) => setStaff({ name }),
      signOut: () => setStaff(null),
    }),
    [staff]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
