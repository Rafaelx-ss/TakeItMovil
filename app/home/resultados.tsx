import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { PatrocinadoresService } from '@/services/patrocinadores.services';
import { Patrocinador } from '@/types/patrocinadores';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';


export default function ResultadosScreen() {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const route = useRoute();

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await PatrocinadoresService.getpatrocinadores(page);

      const fetchedPatrocinadores = response?.data || []; 

      if (fetchedPatrocinadores.length === 0) {
        setHasMore(false); 
      } else {
        setPatrocinadores((prevPatrocinadores) => [...prevPatrocinadores, ...fetchedPatrocinadores]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching patrocinadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePatrocinador = async (id: number) => {
      try {
        await PatrocinadoresService.deletePatrocinador(id); 
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
        className="pt-6 pb-6 px-4"
      >
        <Text className="text-3xl font-extrabold text-text mb-2">Patrocinadores</Text>
        <Button title="Crear" onPress={() => router.replace(`/home/CrearEvento/index`)} />
      </LinearGradient>

      {/* Lista de eventos */}
      <FlatList
        data={patrocinadores}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-backgroundLight p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-text">{item.nombrePatrocinador} - ID: {item.patrocinadorID}</Text>
            <Text className="text-sm font-light text-dorado mt-2">
              📧 {item.correoPatrocinador}
            </Text>
            <Button title="Editar" onPress={() => router.replace(`/home/EditarEvento/index`)} />
            <Button title="Eliminar" onPress={() => deletePatrocinador(item.patrocinadorID)} />
            <Text className="text-sm font-bold text-dorado text-right mt-2">
              🔒 {item.rfcPatrocinador}
            </Text>
          </View>
        )}
        // keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="mt-10">
            <Text className="text-center text-gray-500">
              No hay patrocinadores disponibles
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
