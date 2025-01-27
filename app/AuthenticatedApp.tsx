import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../context/AuthContext";

const AuthenticatedApp: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && segments[0] !== "login") {
      router.replace("/login");
    }

    if (isAuthenticated && segments[0] === "login") {
      router.replace("/home");
    }
  }, [isAuthenticated, segments]);

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="CrearEvento/index" options={{ headerShown: false }} />
      <Stack.Screen name="EditarEvento/index" options={{ headerShown: false }} />
      <Stack.Screen name="CrearPatrocinador/index" options={{ headerShown: false }} />
      <Stack.Screen name="EditarUsuario/index" options={{ headerShown: false }} />
      <Stack.Screen name="CrearUsuario/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguistreGenerar" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguistreLike" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguisteData" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthenticatedApp;