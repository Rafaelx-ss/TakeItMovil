import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { EventosService } from '@/services/events.services';
import { useRouter } from 'expo-router';

export default function CrearEventoScreen() {
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [costoEvento, setCostoEvento] = useState('');
  const router = useRouter();

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
    <View className="flex-1 p-4 bg-background">
      <Text className="text-lg font-bold mb-2 text-text">Nombre del Evento:</Text>
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
  );
}