import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { EventosService } from '@/services/events.services';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Evento } from '@/types/eventos';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function CrearEventoScreen() {
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [costoEvento, setCostoEvento] = useState('');
  const router = useRouter();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const createEvent = async () => {
    try {
      await EventosService.createEvento({ nombreEvento, fechaEvento, costoEvento });
      Alert.alert('Evento creado', 'El evento se creó correctamente.');
      router.back();
    } catch (error) {
      console.error('Error al crear el evento:', error);
      Alert.alert('Error', 'No se pudo crear el evento.');
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-6 px-4 flex-row items-center"
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: width * 0.02 }}>	
          <MaterialIcons name="arrow-back" size={24} color="#E0B942" />
        </TouchableOpacity>
        <Text className="text-3xl font-extrabold text-text">¡Crea Tu Evento!</Text>
      </LinearGradient>

      <View className='p-5 rounded-lg mb-4 shadow-md'>
        <Text className="text-lg font-bold mb-2 text-text mt-4">Nombre del Evento:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={nombreEvento} 
          onChangeText={setNombreEvento} 
        />

        <Text className="text-lg font-bold mb-2 text-text">Fecha del Evento:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={fechaEvento} 
          onChangeText={setFechaEvento} 
          placeholder="YYYY-MM-DD"
        />

        <Text className="text-lg font-bold mb-2 text-text">Costo del Evento:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={costoEvento} 
          onChangeText={setCostoEvento} 
          keyboardType="numeric"
        />
        <Button title="Crear Evento" onPress={createEvent} />
      </View>
    </View>
  );
}