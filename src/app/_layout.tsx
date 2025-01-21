import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import AuthenticatedApp from "./AuthenticatedApp";

const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default RootLayout;
