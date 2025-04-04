import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#E0B942",
        tabBarStyle: {
          backgroundColor: "#0A0A0A",
          borderTopWidth: 2,
          borderColor: "#E0B942",
          height: 90,
          elevation: 5,
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: -2 },
          shadowColor: "#E0B942",
          shadowRadius: 2,
        },
        tabBarLabelStyle: {
          textAlign: "center",
          fontSize: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dasboard",
          tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color="#E0B942" />,
        }}
      />
      <Tabs.Screen
        name="miseventosadmin"
        options={{
          title: "Mis Eventos",
          tabBarIcon: ({ color }) => <FontAwesome name="calendar-plus-o" size={24} color="#E0B942" />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color="#E0B942" />,
        }}
      />
      
    </Tabs>
  )
}

