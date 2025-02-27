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


    //Usuarios participantees:
    "login/index",
    //Crear patrocinador
    "forms/CrearPatrocinador/index",
    //Editar patrocinador
    "forms/EditarPatrocinador/index",
    //Crear evento
    "forms/CrearEvento/index",
    //Editar evento
    "forms/EditarEvento/index",
    //Crear usuario
    "forms/CrearUsuario/index",
    //Editar usuario
    "forms/EditarUsuario/index",
    //Inscripción
    "inscriptions/[id]",
    //Informacion de mis eventos
    "InfoMiEvento/[id]",
    //Configuracion de usuario
    "settings/settings",


    //Usuarios organizadores:
    "adminScreen",

    "QRScanner/QRScanner",


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