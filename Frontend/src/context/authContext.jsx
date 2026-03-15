import { useEffect, useState, useContext, createContext } from "react";
import { getCurrentUser } from "../services/auth.service";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkAuth() {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const currentUser = await getCurrentUser();
        if (!currentUser) {
          setUser(null);
          return;
        }
        setUser(currentUser);
      } catch {
        setUser(null);
        // Clear invalid token
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
