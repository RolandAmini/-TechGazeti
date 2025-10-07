"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérifie la session au montage
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");

    if (loggedIn === "true") {
      setUser({ email: "admin@mail.com" }); // Fake user minimal
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
