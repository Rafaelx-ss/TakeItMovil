import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

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
  ]);

  return (
    <View className="flex-1 bg-white">
      <View className="pt-12 px-4 bg-black">
        <Text className="text-2xl font-bold text-white mb-4">Eventos</Text>
      </View>
      <FlatList
        data={events}
        className="px-4"
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 rounded-lg mb-3 shadow-sm">
            <Text className="text-lg font-semibold">{item.title}</Text>
            <Text className="text-gray-600">{item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}