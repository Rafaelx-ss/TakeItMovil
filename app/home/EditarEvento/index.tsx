import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';

export function EditarEventoScreen({ route }) {
  const { event } = route.params;
  const [nombreEvento, setNombreEvento] = useState(event.nombreEvento);
  const [fechaEvento, setFechaEvento] = useState(event.fechaEvento);
  const [costoEvento, setCostoEvento] = useState(event.costoEvento);
  const navigation = useNavigation();

  const updateEvent = async () => {
    try {
      await EventosService.updateEvento(event.eventoID, { nombreEvento, fechaEvento, costoEvento });
      Alert.alert('Evento actualizado', 'El evento se actualizó correctamente.');
      navigation.goBack();
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