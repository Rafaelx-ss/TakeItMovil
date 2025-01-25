import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';

export default function EditarEventoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams(); 

  const event: Evento = params as any; 

  const [nombreEvento, setNombreEvento] = useState(event.nombreEvento);
  const [fechaEvento, setFechaEvento] = useState(event.fechaEvento);
  const [costoEvento, setCostoEvento] = useState(event.costoEvento);

  const updateEvent = async () => {
    try {
      await EventosService.updateEvento(event.eventoID, { nombreEvento, fechaEvento, costoEvento });
      Alert.alert('Evento actualizado', 'El evento se actualizó correctamente.');
      router.back();
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      Alert.alert('Error', 'No se pudo actualizar el evento.');
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

      <Button title="Guardar Cambios" onPress={updateEvent} />
    </View>
  );
}

