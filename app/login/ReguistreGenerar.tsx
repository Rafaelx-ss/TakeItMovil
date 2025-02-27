import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from "react";
import axios from "axios";
import { backend } from '@/context/endpoints';
import { Generar } from '@/types/login';
import { ScrollView } from "react-native-gesture-handler";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ReguistreGenerar() {

  const [Nameuser, setNameuser] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");
  const [signedpassword, setsignedpassword] = useState("");

  
  const progress = 25;
  const router = useRouter();

  const  validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const ReguisG = async () => {
    if (!Nameuser || !email || !fullname || !password || !signedpassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Error", "Por favor, introduce un email válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== signedpassword) {
      Alert.alert("Error", "Las contraseñas ingresadas no coinciden.");
      return;
    }

    

    try {
      const response = await axios.post(`${backend}/api/auth/verificarcuenta`, {
        nombreUsuario: fullname,
        email: email,
      });

  
      console.log(response.data);
      
      router.push({
        pathname: '/login/ReguistreLike',
        params: { 
          fullname: fullname,
          usuario: Nameuser,
          email: email,
          password: password
        }
      });

    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
        Alert.alert("Error", error.response.data.message || "Ocurrió un error en el servidor.");
      } else {
        console.error("Error en la solicitud:", error.message);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: height * 0.05,
          marginLeft: width * 0.05,
        }}
        onPress={() => router.back()}
      >
        <Icon
          style={{ marginTop: height * 0.005 }}
          name={'chevron-left'}
          size={20}
          color="#FCA311"
        />
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View>
        <Text style={styles.titulo}>¡Crea tu cuenta!</Text>
        <Text style={styles.subtitulo}>Ingresa todos tus datos y nosotros hacemos la magia...</Text>
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor={"grey"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre Completo"
          placeholderTextColor={"grey"}
          value={fullname}
          onChangeText={setfullname}
        />
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre de Usuario"
          placeholderTextColor={"grey"}
          value={Nameuser}
          onChangeText={setNameuser}
        />
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          placeholderTextColor={"grey"}
          value={password}
          onChangeText={setpassword}
          secureTextEntry
        />
      </View>

      <View style={styles.Text}>
        <TextInput
          style={styles.TextInputConfirm}
          placeholder="Confirmar Contraseña"
          placeholderTextColor={"black"}
          value={signedpassword}
          onChangeText={setsignedpassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.buttom} onPress={ReguisG}>
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
        color: '#fff',
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
      TextInputConfirm: {
        borderWidth: 3,
        borderColor: '#D4AF37',
        borderRadius: 5,
        width: '90%',
        marginTop: height * 0.01,
        color: '#000',
        height: height * 0.05,
        backgroundColor: '#fff',
        paddingLeft: width * 0.03,
      },
      progress: {
        height: '100%',
        backgroundColor: '#D4AF37', 
        borderRadius: 2.5,
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
        textAlignVertical: 'center',
        fontWeight:'500',
      },

    
});

