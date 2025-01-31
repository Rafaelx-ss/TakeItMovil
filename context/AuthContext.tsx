import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definimos la interfaz del contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  usuarioID: number | null;
  login: (token: string, usuarioID: number) => void;
  logout: () => void;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [usuarioID, setUsuarioID] = useState<number | null>(null);

  // Cargar datos de autenticación al iniciar la app
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUsuarioID = await AsyncStorage.getItem("usuarioID");

        if (storedToken && storedUsuarioID) {
          setToken(storedToken);
          setUsuarioID(parseInt(storedUsuarioID, 10)); // Convertir a número
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error cargando datos de autenticación:", error);
      }
    };

    loadAuthData();
  }, []);

  // Función para iniciar sesión
  const login = async (newToken: string, newUsuarioID: number) => {
    try {
      const usuarioIDString = newUsuarioID.toString(); // Convertir número a string para almacenar

      setToken(newToken);
      setUsuarioID(newUsuarioID);
      setIsAuthenticated(true);

      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("usuarioID", usuarioIDString);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setToken(null);
      setUsuarioID(null);
      setIsAuthenticated(false);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuarioID");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, usuarioID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};