import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { UsersService } from '@/services/users.service'
import { useAuth } from '@/context/AuthContext';


const ChangePhoneScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();
  const { usuarioID } = useAuth();

  const handleSave = async () => {
    try {
      await UsersService.editarUsuario(Number(usuarioID), 'phoneNumber', phoneNumber);
      console.log('Éxito', 'Número de teléfono guardado correctamente');
      router.back();
    } catch (error) {
      console.log('Error', 'Hubo un problema al guardar el número de teléfono');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    router.back();
  };

  return (
    <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#E0B942" />
        </TouchableOpacity>
        </View>
      <Text style={styles.title}>Cambiar Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo número de teléfono"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>¡Actualización Exitosa! 🎉</Text>
            <Text style={styles.modalText}>El número de teléfono se ha actualizado correctamente.</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>¡Excelente!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  saveButton: {
    backgroundColor: '#E0B942',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0B942',
    marginBottom: 10,
  },
  modalText: {
    color: '#E0B942',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#E0B942',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePhoneScreen;