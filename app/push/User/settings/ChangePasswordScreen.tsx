import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const router = useRouter();

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar la nueva contraseña
    if (newPassword === confirmPassword) {
      console.log('Contraseña actual:', currentPassword);
      console.log('Nueva contraseña:', newPassword);
      router.back();
    } else {
      console.log('Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#E0B942" />
        </TouchableOpacity>
        </View>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña actual"
        placeholderTextColor="#888"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar nueva contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 24,
    color: '#E0B942',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0B942',
    borderRadius: 5,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  saveButton: {
    backgroundColor: '#E0B942',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;