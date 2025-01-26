import type React from "react"
import { useEffect } from "react"
import { Stack } from "expo-router"
import { AuthProvider } from "../context/AuthContext"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import AuthenticatedApp from "./AuthenticatedApp"
import "@/global.css"
import { StatusBar } from "expo-status-bar"
import { View, AppState, Platform } from "react-native"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/utils/react-query"


const RootLayout: React.FC = () => {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "#1A1A1A" }}>
            <StatusBar style="light" />
            <AuthenticatedApp />
          </View>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default RootLayout

