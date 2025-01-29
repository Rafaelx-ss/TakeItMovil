import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, Alert, Dimensions } from 'react-native';
import { UsersService } from '@/services/users.service';
import { useRouter } from 'expo-router';
import HeaderGradient from '@/components/HeaderGradient'
import { Picker } from '@react-native-picker/picker';

export default function CrearUsuario() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefonoUsuario, setTelefonoUsuario] = useState('');
  const [generoUsuario, setGeneroUsuario] = useState('');
  const [rolUsuario, setRolUsuario] = useState('');

  const router = useRouter();

  const createUser = async () => {
    try {
      await UsersService.crearUser(nombreUsuario, usuario, email, password, telefonoUsuario, generoUsuario, rolUsuario);
      Alert.alert('Usuario creado', 'El usuario se creó correctamente.');
      router.back();
    } catch (error) {
      console.error('Error al crear el patrocinador:', error);
      Alert.alert('Error', 'No se pudo crear el patrocinador.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <View className="flex-1 bg-background">
        {/* Encabezado */}
        <HeaderGradient title="Crea un nuevo usuario" showBackButton onBackPress={() => router.back()} />


        <View className='p-5 rounded-lg mb-4 shadow-md'>
          <Text className="text-lg font-bold mb-2 text-text mt-4">Nombre completo:</Text>
          <TextInput 
            className="border border-gray-300 p-2 mb-4 rounded text-text" 
            value={nombreUsuario} 
            onChangeText={setNombreUsuario} 
          />
          <Text className="text-lg font-bold mb-2 text-text">Nombre usuario unico:</Text>
          <TextInput 
            className="border border-gray-300 p-2 mb-4 rounded text-text" 
            value={usuario} 
            onChangeText={setUsuario} 
          />
          <Text className="text-lg font-bold mb-2 text-text">Email:</Text>
          <TextInput 
            keyboardType='email-address'
            className="border border-gray-300 p-2 mb-4 rounded text-text" 
            value={email} 
            onChangeText={setEmail} 
          />
          <Text className="text-lg font-bold mb-2 text-text">Contraseña:</Text>
          <TextInput 
            keyboardType='visible-password'
            className="border border-gray-300 p-2 mb-4 rounded text-text" 
            value={password} 
            onChangeText={setPassword} 
          />
          <Text className="text-lg font-bold mb-2 text-text">Telefono:</Text>
          <TextInput 
            keyboardType='phone-pad'
            className="border border-gray-300 p-2 mb-4 rounded text-text" 
            value={telefonoUsuario} 
            onChangeText={setTelefonoUsuario} 
          />
          <Text className="text-lg font-bold mb-2 text-text">Genero:</Text>
          <View style={{ borderColor: '#fff', borderWidth: 1, padding: 0, marginBottom: 16, borderRadius: 4 }}>
            <Picker
              selectedValue={generoUsuario}
              onValueChange={(itemValue) => setGeneroUsuario(itemValue)}
              style={{ color: '#fff' }}
            >
              <Picker.Item label="Masculino" value="MASCULINO" />
              <Picker.Item label="Femenino" value="FEMENINO" />
              <Picker.Item label="Otro" value="OTRO" />
            </Picker>
          </View>
          
          <Text className="text-lg font-bold mb-2 text-text">Rol de usuario:</Text>
          <View style={{ borderColor: '#fff', borderWidth: 1, padding: 0, marginBottom: 16, borderRadius: 4 }}>
            <Picker
              selectedValue={rolUsuario}
              onValueChange={(itemValue) => setRolUsuario(itemValue)}
              style={{ color: '#fff' }}
            >
              <Picker.Item label="Organizador" value="organizador" />
              <Picker.Item label="Participante" value="participante" />
            </Picker>
          </View>
          <Button title="Crear Usuario" onPress={createUser} />
        </View>
      </View>
    </ScrollView>
  );
}