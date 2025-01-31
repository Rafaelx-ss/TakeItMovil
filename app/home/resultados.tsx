import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { PatrocinadoresService } from '@/services/patrocinadores.service';
import { Patrocinador } from '@/types/patrocinadores';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderGradient from '@/components/HeaderGradient';


export default function ResultadosScreen() {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const route = useRouter();

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
        Alert.alert('Patrocinador eliminado', 'El patrocinador ha sido eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el patrocinador:', error);
        Alert.alert('Error', 'No se pudo eliminar el patrocinador.');
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <HeaderGradient
        title="Patrocinadores"
        rightButtonText="Crear"
        rightButtonIcon="add"
        onRightButtonPress={() => route.push("/CrearPatrocinador")}
      />


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
            <View className="flex-row justify-end absolute right-5 top-5 space-x-2">
              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 5 }}
                onPress={() => route.push(`/EditarPatrocinador?patrocinadorID=${item.patrocinadorID}`)}
              >
                <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={() => deletePatrocinador(item.patrocinadorID)}
              >
                <MaterialIcons name="delete" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
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
