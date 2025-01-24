import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { EventosService } from '@/services/events.services';
import { Evento } from '@/types/eventos';
export function CrearEventoScreen() {
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [costoEvento, setCostoEvento] = useState('');
  const navigation = useNavigation();

  const createEvent = async () => {
    try {
      await EventosService.createEvento({ nombreEvento, fechaEvento, costoEvento });
      Alert.alert('Evento creado', 'El evento se creó correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al crear el evento:', error);
      Alert.alert('Error', 'No se pudo crear el evento.');
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

      <Button title="Crear Evento" onPress={createEvent} />
    </View>
  );
}