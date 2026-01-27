import { createContext, useContext, useState } from "react";
import { authUser as mockUser } from "./authUser";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Por ahora usamos el mock, más adelante esto vendrá del backend
  const [user, setUser] = useState(mockUser);

  // Función para simular login (futuro: llamará al backend)
  const login = (userData) => {
    setUser(userData);
  };

  // Función para simular logout (futuro: limpiará session/token)
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}