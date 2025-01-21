import { View, Text, FlatList } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface Event {
  id: string;
  title: string;
  date: string;
}

export default function EventosScreen() {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Evento 1', date: '2024-03-20' },
    { id: '2', title: 'Evento 2', date: '2024-03-21' },
    { id: '3', title: 'Evento 3', date: '2024-03-22' },
    { id: '4', title: 'Evento 4', date: '2024-03-23' },
    { id: '5', title: 'Evento 5', date: '2024-03-24' },
    { id: '6', title: 'Evento 6', date: '2024-03-25' },
    { id: '7', title: 'Evento 7', date: '2024-03-26' },
    { id: '8', title: 'Evento 8', date: '2024-03-27' },
    { id: '9', title: 'Evento 9', date: '2024-03-28' },
    { id: '10', title: 'Evento 10', date: '2024-03-29' },
    { id: '11', title: 'Evento 11', date: '2024-03-30' },
    { id: '12', title: 'Evento 12', date: '2024-03-31' },
    { id: '13', title: 'Evento 13', date: '2024-04-01' },
    { id: '14', title: 'Evento 14', date: '2024-04-02' },
    { id: '15', title: 'Evento 15', date: '2024-04-03' },
    { id: '16', title: 'Evento 16', date: '2024-04-04' },
    { id: '17', title: 'Evento 17', date: '2024-04-05' },
    { id: '18', title: 'Evento 18', date: '2024-04-06' },
    { id: '19', title: 'Evento 19', date: '2024-04-07' },
    { id: '20', title: 'Evento 20', date: '2024-04-08' },
    { id: '21', title: 'Evento 21', date: '2024-04-09' },
    { id: '22', title: 'Evento 22', date: '2024-04-10' },
    { id: '23', title: 'Evento 23', date: '2024-04-11' },
    { id: '24', title: 'Evento 24', date: '2024-04-12' },
    { id: '25', title: 'Evento 25', date: '2024-04-13' },
    { id: '26', title: 'Evento 26', date: '2024-04-14' },
    { id: '27', title: 'Evento 27', date: '2024-04-15' },
    { id: '28', title: 'Evento 28', date: '2024-04-16' },
    { id: '29', title: 'Evento 29', date: '2024-04-17' },
    { id: '30', title: 'Evento 30', date: '2024-04-18' },
    
  ]);

  
  return (
    <View className="flex-1 bg-gray-50">
      {/* Encabezado */}
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-12 pb-6 px-4"
      >
        <Text className="text-3xl font-extrabold text-white mb-2">Eventos</Text>
        <Text className="text-lg text-gray-200">
          Lista de todos los eventos [API]
        </Text>
      </LinearGradient>

      {/* Lista de eventos */}
      <FlatList
        data={events}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-white p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
            <Text className="text-sm font-medium text-indigo-600 mt-2">
              📅 {item.date}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="mt-10">
            <Text className="text-center text-gray-500">
              No hay eventos disponibles
            </Text>
          </View>
        )}
      />
    </View>
  );
}