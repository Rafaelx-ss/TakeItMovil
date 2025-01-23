import React, { createContext, useContext, useState, ReactNode } from "react";

// Definir los tipos
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Crear el contexto con los valores iniciales
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para iniciar sesión
  const login = () => setIsAuthenticated(true);

  // Función para cerrar sesión
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de forma sencilla
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
