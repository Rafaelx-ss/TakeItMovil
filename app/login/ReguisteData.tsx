import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { backend } from '@/context/endpoints';
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ReguisteData() {
  const progress = 95;
  const router = useRouter();
  const params = useLocalSearchParams();

  const { nombreUsuario, usuario, email, password } = params;

  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [genero, setGenero] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [loading, setLoading] = useState(false);

  const validarNumero = (num) => /^[0-9]{8,}$/.test(num);
  const formatearFecha = (fecha) => fecha.toISOString().split("T")[0];

  const validarFormulario = () => {
    if (!validarNumero(numero)) {
      Alert.alert("Error", "El número debe contener al menos 8 dígitos.");
      return;
    }
    if (!genero) {
      Alert.alert("Error", "Selecciona un género.");
      return;
    }
    if (!ubicacion.trim()) {
      Alert.alert("Error", "La ubicación no puede estar vacía.");
      return;
    }
    ReguisData();
  };

  const ReguisData = async () => {
    setLoading(true);
    try {
      await axios.post(`${backend}/api/auth/register`, {
        nombreUsuario,
        usuario,
        email,
        password,
        telefonoUsuario: numero,
        fechaNacimientoUsuario: formatearFecha(fecha),
        generoUsuario: genero,
        rolUsuario: "participante",
      });
      setLoading(false);
      router.replace("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error en el registro:", error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#D4AF37" />
            <Text style={styles.modalText}>En proceso...</Text>
          </View>
        </View>
      </Modal>
      <ScrollView>

        <TouchableOpacity style={{ flexDirection: "row", marginTop: height * 0.05, marginLeft: width * 0.05 }} onPress={() => router.back()}>
          <Icon style={{ marginTop: height * 0.005 }} name="chevron-left" size={20} color="#FCA311" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <View>
          <Text style={styles.titulo}>¡Ya casi terminas!</Text>
          <Text style={styles.subtitulo}>Solo necesitamos unos datos más...</Text>
        </View>

        <View style={styles.Text}>
          <TextInput
            style={styles.TextInput}
            placeholder="Número de teléfono (solo números)"
            placeholderTextColor="grey"
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
          />
        </View>
        <TouchableOpacity style={styles.Text} onPress={() => setMostrarFecha(true)}>
          <TextInput 
            style={styles.TextInput} 
            placeholder="Selecciona tu fecha de nacimiento" 
            placeholderTextColor="grey" 
            editable={false} 
            value={fecha ? fecha.toLocaleDateString() : ''}
          />
        </TouchableOpacity>
        {mostrarFecha && (
          <DateTimePicker
            value={fecha}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              setMostrarFecha(false);
              if (selectedDate) setFecha(selectedDate);
            }}
          />
        )}

        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={genero} 
            onValueChange={setGenero} 
            style={styles.picker} 
            dropdownIconColor="grey"
          >
            <Picker.Item label="Selecciona tu género" value="" color="grey" />
            <Picker.Item label="Masculino" value="MASCULINO" color="#FFFFFF" />
            <Picker.Item label="Femenino" value="FEMENINO" color="#FFFFFF" />
            <Picker.Item label="Otro" value="OTRO" color="#FFFFFF" />
          </Picker>
        </View>

        <View style={styles.Text}>
          <TextInput
            style={styles.TextInput}
            placeholder="Ciudad o ubicación actual"
            placeholderTextColor="grey"
            value={ubicacion}
            onChangeText={setUbicacion}
          />
        </View>

        <TouchableOpacity style={styles.buttom} onPress={validarFormulario}>
          <Text style={styles.textButtom}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: '#fff', 
    padding: 20, borderRadius: 10,
    alignItems: 'center' },
    modalText: { 
      marginTop: 10, 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#000' },
  progressContainer: {
    height: 5, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 2.5,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center', 
    marginTop: height * 0.02,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4AF37',
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    marginLeft: width * 0.05,
    marginTop: height * 0.05,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#6E7375',
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginTop: height * 0.01,
    fontSize: 20,
  },
  Text: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '90%',
    marginTop: height * 0.01,
    color: '#fff',
    height: height * 0.05,
    paddingLeft: width * 0.03,
    paddingRight: width * 0.03,
  },
  pickerContainer: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    marginTop: height * 0.03,
    height: height * 0.07,
    alignItems: 'center', 
   
  },

  picker: {
    color: '#FFFFFF',
    backgroundColor: '#1A1A1A',
    fontSize: 12,
    width: '100%',
    textAlignVertical: 'center',
  },



  buttom: {
    backgroundColor: '#D4AF37',
    width: width * 0.9,
    height: height * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.05,
    borderRadius: 10,
  },
  textButtom: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});

