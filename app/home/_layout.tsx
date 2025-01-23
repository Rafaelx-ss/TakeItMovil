import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E0B942',
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopWidth: 1,
          borderTopColor: '#E0B942',
          height: 80,
          elevation: 5, 
          shadowOpacity: 0.5, 
          shadowOffset: { width: 0, height: -2 }, 
        },
        tabBarLabelStyle: {
          textAlign: 'center',
          fontSize: 14,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={24} className='text-dorado'/>
          ),
        }}
      />
      <Tabs.Screen
        name="resultados"
        options={{
          title: 'Patrocinadores',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={24} className='text-dorado'/>
          ),
        }}
      />
      <Tabs.Screen
        name="mis-eventos"
        options={{
          title: 'Mis Eventos',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar-plus-o" size={24} className='text-dorado'/>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Usuarios',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} className='text-dorado'/>
          ),
        }}
      />
    </Tabs>
  );
}