import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [staff, setStaff] = useState(null); // null = signed out

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
