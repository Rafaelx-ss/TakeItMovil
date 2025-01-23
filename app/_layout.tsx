import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import AuthenticatedApp from "./AuthenticatedApp";
import '@/global.css';

const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

export default RootLayout;
