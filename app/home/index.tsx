//@/app/home/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';


export default function EventosScreen() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const route = useRouter();

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

  const deleteEvent = async (id: number) => {
    try {
      await EventosService.deleteEvento(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event.eventoID !== id));
      Alert.alert('Evento eliminado', 'El evento ha sido eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      Alert.alert('Error', 'No se pudo eliminar el evento.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-6 pb-6 px-4 flex-row justify-between items-center"
      >
        <Text className="text-3xl font-extrabold text-text">Eventos</Text>

        <TouchableOpacity
          style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, width: 90, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          onPress={() => route.push('/CrearEvento')}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Crear</Text>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Lista de eventos */}
      <FlatList
        data={events}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-backgroundLight p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-text">{item.nombreEvento} - ID: {item.eventoID}</Text>
            <View className="flex-row justify-end absolute right-5 top-5 space-x-2">
              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 5 }}
                onPress={() => route.push(`/EditarEvento?event=${item.eventoID}`)}
              >
                <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={() => deleteEvent(item.eventoID)}
              >
                <MaterialIcons name="delete" size={18} color="#FFFFFF" />
              </TouchableOpacity>

            </View>
            <Text className="text-sm font-medium text-dorado mt-2">📅 {item.fechaEvento}</Text>
            <Text className="text-sm font-bold text-dorado text-right mt-2">${item.costoEvento} MXN</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="mt-10">
            <Text className="text-center text-gray-500">No hay eventos disponibles</Text>
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
