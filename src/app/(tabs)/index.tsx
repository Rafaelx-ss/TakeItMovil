//@/app/(tabs)/index.tsx
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';


export default function EventosScreen() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await EventosService.geteventos(page);
      const fetchedEvents = response?.data || []; 

      if (fetchedEvents.length === 0) {
        setHasMore(false); 
      } else {
        setEvents((prevEvents) => [...prevEvents, ...fetchedEvents]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Encabezado */}
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-6 pb-6 px-4"
      >
        <Text className="text-3xl font-extrabold text-text mb-2">Take It</Text>
      </LinearGradient>

      {/* Lista de eventos */}
      <FlatList
        data={events}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-background p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-gray-800">{item.nombreEvento}</Text>
            <Text className="text-sm font-medium text-indigo-600 mt-2">
              📅 {item.fechaEvento}
            </Text>
          </View>
        )}
        // keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="mt-10">
            <Text className="text-center text-gray-500">
              No hay eventos disponibles
            </Text>
          </View>
        )}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
}
