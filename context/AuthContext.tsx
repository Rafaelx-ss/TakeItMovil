import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definimos la interfaz del contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  usuarioID: number | null;
  email: string | null;
  username: string | null;
  rol: string | null;
  telefonoUsuario: string | null;
  generoUsuario: string | null;
  fechaNacimientoUsuario: string | null;
  login: (
    token: string,
    usuarioID: number,
    email: string,
    username: string,
    rol: string,
    telefonoUsuario: string,
    generoUsuario: string,
    fechaNacimientoUsuario: string
  ) => void;
  logout: () => void;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [usuarioID, setUsuarioID] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [rol, setRol] = useState<string | null>(null);
  const [telefonoUsuario, setTelefonoUsuario] = useState<string | null>(null);
  const [generoUsuario, setGeneroUsuario] = useState<string | null>(null);
  const [fechaNacimientoUsuario, setFechaNacimientoUsuario] = useState<string | null>(null);

  // Cargar datos de autenticación al iniciar la app
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUsuarioID = await AsyncStorage.getItem("usuarioID");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedUsername = await AsyncStorage.getItem("username");
        const storedRol = await AsyncStorage.getItem("rol");
        const storedTelefonoUsuario = await AsyncStorage.getItem("telefonoUsuario");
        const storedGeneroUsuario = await AsyncStorage.getItem("generoUsuario");
        const storedFechaNacimientoUsuario = await AsyncStorage.getItem("fechaNacimientoUsuario");

        if (storedToken && storedUsuarioID && storedEmail && storedUsername) {
          setToken(storedToken);
          setUsuarioID(parseInt(storedUsuarioID, 10));
          setEmail(storedEmail);
          setUsername(storedUsername);
          setRol(storedRol);
          setTelefonoUsuario(storedTelefonoUsuario);
          setGeneroUsuario(storedGeneroUsuario);
          setFechaNacimientoUsuario(storedFechaNacimientoUsuario);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error cargando datos de autenticación:", error);
      }
    };

    loadAuthData();
  }, []);

  // Función para iniciar sesión
  const login = async (
    newToken: string,
    newUsuarioID: number,
    newEmail: string,
    newUsername: string,
    newRol: string,
    newTelefonoUsuario: string,
    newGeneroUsuario: string,
    newFechaNacimientoUsuario: string
  ) => {
    try {
      setToken(newToken);
      setUsuarioID(newUsuarioID);
      setEmail(newEmail);
      setUsername(newUsername);
      setRol(newRol);
      setTelefonoUsuario(newTelefonoUsuario);
      setGeneroUsuario(newGeneroUsuario);
      setFechaNacimientoUsuario(newFechaNacimientoUsuario);
      setIsAuthenticated(true);

      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("usuarioID", newUsuarioID.toString());
      await AsyncStorage.setItem("email", newEmail);
      await AsyncStorage.setItem("username", newUsername);
      await AsyncStorage.setItem("rol", newRol);
      await AsyncStorage.setItem("telefonoUsuario", newTelefonoUsuario);
      await AsyncStorage.setItem("generoUsuario", newGeneroUsuario);
      await AsyncStorage.setItem("fechaNacimientoUsuario", newFechaNacimientoUsuario);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      setToken(null);
      setUsuarioID(null);
      setEmail(null);
      setUsername(null);
      setRol(null);
      setTelefonoUsuario(null);
      setGeneroUsuario(null);
      setFechaNacimientoUsuario(null);
      setIsAuthenticated(false);

      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("usuarioID");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("rol");
      await AsyncStorage.removeItem("telefonoUsuario");
      await AsyncStorage.removeItem("generoUsuario");
      await AsyncStorage.removeItem("fechaNacimientoUsuario");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        usuarioID,
        email,
        username,
        rol,
        telefonoUsuario,
        generoUsuario,
        fechaNacimientoUsuario,
        login,
        logout,
      }}
    >
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
