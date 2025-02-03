import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "../context/AuthContext";

const AuthenticatedApp: React.FC = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, rol } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && segments[0] !== "login") {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && segments[0] === "login") {
      console.log(rol)
      if(rol === 'Organizador'){
        router.replace("../adminScreen");
       }
       else{
        router.replace("/home");
       }
      
    }
  }, [isAuthenticated, rol, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="login/index" options={{ headerShown: false }} />
      <Stack.Screen name="login/LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="login/RecoverAccount" options={{ headerShown: false }} />
      <Stack.Screen name="login/CodigoVerifiacion" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguistreGenerar" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguistreLike" options={{ headerShown: false }} />
      <Stack.Screen name="login/ReguisteData" options={{ headerShown: false }} />
      <Stack.Screen name="CrearPatrocinador/index" options={{ headerShown: false }} />
      <Stack.Screen name="forms/CrearEvento/index" options={{ headerShown: false }} />
      <Stack.Screen name="forms/EditarEvento/index" options={{ headerShown: false }} />
      <Stack.Screen name="forms/EditarUsuario/index" options={{ headerShown: false }} />
      <Stack.Screen name="forms/CrearUsuario/index" options={{ headerShown: false }} />
      <Stack.Screen name="inscriptions/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="adminScreen/index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthenticatedApp;