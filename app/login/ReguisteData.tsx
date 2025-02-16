import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { backend } from '@/context/endpoints';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ReguisteData() {
  const progress = 95;
  const router = useRouter();
  const params = useLocalSearchParams();

  // Extraer datos enviados desde ReguistreGenerar
  const { nombreUsuario, usuario, email, password } = params;

  // Estado de los inputs
  const [numero, setNumero] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [genero, setGenero] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  // Función para validar número
  const validarNumero = (num : string) => /^[0-9]{8,}$/.test(num);

  // Formatear fecha a YYYY-MM-DD
  const formatearFecha = (fecha : Date  ) => fecha.toISOString().split("T")[0]; 

  // Validar formulario antes de enviar
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

    // Si todo está correcto, continuar con el registro
    ReguisData();
  };



  // Enviar datos al backend
  const ReguisData = async () => {

    console.log(nombreUsuario,usuario,email)
    try {
      const response = await axios.post(`${backend}/api/auth/register`, {
        nombreUsuario,
        usuario,
        email,
        password,
        telefonoUsuario: numero,
        fechaNacimientoUsuario: formatearFecha(fecha),
        generoUsuario: genero,
        rolUsuario: "participante",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Error en el registro:", error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", marginTop: height * 0.05, marginLeft: width * 0.05 }}
        onPress={() => router.back()}
      >
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
          placeholder="Número"
          placeholderTextColor={"grey"}
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />
      </View>

      {/* Botón para abrir el DateTimePicker */}
      <TouchableOpacity style={styles.Text} onPress={() => setMostrarFecha(true)}>
        <TextInput
          style={styles.TextInput}
          placeholder="Fecha de Nacimiento"
          placeholderTextColor={"grey"}
          editable={false}
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

      {/* Picker para seleccionar el género */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.picker}
          dropdownIconColor={"grey"}
        >
          <Picker.Item label="Selecciona tu género" value="" color="grey" />
          <Picker.Item label="Masculino" value="MASCULINO" color="#000000" />
          <Picker.Item label="Femenino" value="FEMENINO" color="#000000" />
          <Picker.Item label="Otro" value="OTRO" color="#000000" />
        </Picker>
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInput}
          placeholder="Ubicación"
          placeholderTextColor={"grey"}
          value={ubicacion}
          onChangeText={setUbicacion}
        />
      </View>

      <TouchableOpacity style={styles.buttom} onPress={validarFormulario}>
        <Text style={styles.textButtom}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
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
  },
  pickerContainer: {
    width: '90%',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    marginTop: height * 0.03,
    height: height * 0.07,
    alignItems: 'center', // Centra el Picker verticalmente
   
  },

  picker: {
    color: '#FFFFFF',
    backgroundColor: '#1A1A1A',
    fontSize: 12,
    width: '100%',
    textAlignVertical: 'center', // Asegura que el texto no se corte en la parte superior/inferior
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

