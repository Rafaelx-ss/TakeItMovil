import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../context/AuthContext";

const AuthenticatedApp: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Si el usuario no está autenticado, redirigir a login
    if (!isAuthenticated && segments[0] !== "login") {
      router.replace("/login");
    }

    // Si el usuario está autenticado y está en login, redirigir al grupo de pestañas
    if (isAuthenticated && segments[0] === "login") {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      {/* Grupo de pestañas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Pantalla de login */}
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthenticatedApp;
