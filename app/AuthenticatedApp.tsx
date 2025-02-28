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

  const screens = [
    //Inicio
    "home",
    "login/index",

    //Inicio de sesión
    "login/LoginScreen",
    //Recuperar cuenta
    "login/RecoverAccount",
    //Código de verificación
    "login/NewPassword",
    "login/CodigoVerifiacion",
    //Registro de usuario
    "login/ReguistreGenerar",
    "login/ReguistreLike",
    "login/ReguisteData",

    //Admin
    "adminScreen",

    //Push
    "push/Admin",
    "push/User",

    //push/Admin
    "push/Admin/forms/CrearEvento",
    "push/Admin/forms/EditarEvento",
    "push/Admin/forms/CrearPatrocinador",
    "push/Admin/forms/EditarPatrocinador",
    "push/Admin/forms/CrearUsuario",
    "push/Admin/forms/EditarUsuario",
    "push/Admin/QRScanners/QRScanner",
    "push/Admin/QRScanners/[id]",

    //push/User
    "push/User/inscriptions/[id]",
    "push/User/InfoMiEvento/[id]",
    "push/User/settings/settings",


  ];
  
  return (
    <Stack>
      {screens.map((screen) => (
        <Stack.Screen key={screen} name={screen} options={{ headerShown: false }} />
      ))}
    </Stack>
  );

};

export default AuthenticatedApp;