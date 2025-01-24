//@/app/EditarEvento/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';
import { useRouter } from 'expo-router';

export function EditarEventoScreen({ route }: { route: { params: { event: Evento } } }) {
  const { event } = route.params;
  const router = useRouter();
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
    <View className="p-4">
      <Text>Nombre del Evento:</Text>
      <TextInput className="border p-2 mb-4" value={nombreEvento} onChangeText={setNombreEvento} />

      <Text>Fecha del Evento:</Text>
      <TextInput className="border p-2 mb-4" value={fechaEvento} onChangeText={setFechaEvento} />

      <Text>Costo del Evento:</Text>
      <TextInput className="border p-2 mb-4" value={costoEvento} onChangeText={setCostoEvento} />

      <Button title="Guardar Cambios" onPress={updateEvent} />
    </View>
  );
}