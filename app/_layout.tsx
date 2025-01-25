import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthenticatedApp from "./AuthenticatedApp";
import '@/global.css';

const RootLayout: React.FC = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <AuthenticatedApp />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default RootLayout;
