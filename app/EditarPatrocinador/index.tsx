import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { PatrocinadoresService } from '@/services/patrocinadores.service';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Patrocinador } from '@/types/patrocinadores';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function CrearPatrocinadorScreen() {
  const [nombrePatrocinador, setNombrePatrocinador] = useState('');
  const [representantePatrocinador, setRepresentantePatrocinador] = useState('');
  const [rfcPatrocinador, setRfcPatrocinador] = useState('');
  const [correoPatrocinador, setCorreoPatrocinador] = useState('');
  const [telefonoPatrocinador, setTelefonoPatrocinador] = useState('');
  const [numeroRepresentantePatrocinador, setNumeroRepresentantePatrocinador] = useState('');

  const router = useRouter();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const obtenerPatrocinador = async () => {
    try {
        const response = await PatrocinadoresService.getPatrocinador(patrocinadorID);
        setNombrePatrocinador(response.nombrePatrocinador);      Alert.alert('Patrocinador creado', 'El patrocinador se creó correctamente.');
      router.back();
    } catch (error) {
      console.error('Error al crear el patrocinador:', error);
      Alert.alert('Error', 'No se pudo crear el patrocinador.');
    }
  };
  useEffect(() => {
      obtenerPatrocinador();
    }, []);

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
        <Text className="text-3xl font-extrabold text-text">¡Agrega un Patrocinador!</Text>
      </LinearGradient>

      <View className='p-5 rounded-lg mb-4 shadow-md'>
        <Text className="text-lg font-bold mb-2 text-text mt-4">Nombre del Patrocinador:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={nombrePatrocinador} 
          onChangeText={setNombrePatrocinador} 
        />
        <Text className="text-lg font-bold mb-2 text-text mt-4">Representante del Patrocinador:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={representantePatrocinador} 
          onChangeText={setRepresentantePatrocinador} 
        />
        <Text className="text-lg font-bold mb-2 text-text mt-4">RFC del Patrocinador:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={rfcPatrocinador} 
          onChangeText={setRfcPatrocinador} 
        />
        <Text className="text-lg font-bold mb-2 text-text mt-4">Correo del Patrocinador:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={correoPatrocinador} 
          onChangeText={setCorreoPatrocinador} 
        />
        <Text className="text-lg font-bold mb-2 text-text mt-4">Teléfono del Patrocinador:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={telefonoPatrocinador} 
          onChangeText={setTelefonoPatrocinador} 
        />
        <Text className="text-lg font-bold mb-2 text-text mt-4">Número del Representante:</Text>
        <TextInput 
          className="border border-gray-300 p-2 mb-4 rounded text-text" 
          value={numeroRepresentantePatrocinador} 
          onChangeText={setNumeroRepresentantePatrocinador} 
        />
        <Button title="Agregar Patrocinador" onPress={createPatrocinador} />
      </View>
    </View>
  );
}

