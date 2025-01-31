import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { backend } from '@/context/endpoints';




const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
     
      const response = await axios.post(`${backend}/api/auth/login`, {
        email,
        password,
      });
  
     
      const { data } = response;
      const usuarioID = response.data.data.user.usuarioID;
      const { token } = data.data;
    
       
      console.log(usuarioID);console.log( data.data.user.email);console.log( data.data.user.telefonoUsuario);console.log(token)
      console.log( data.data.user.generoUsuario);
      console.log( data.data.user.rolUsuario);
      console.log( data.data.user.nombreUsuario);
      console.log( data.data.user.fechaNacimientoUsuario);
  
      
        login(token, usuarioID,data.data.user.email,data.data.user.nombreUsuario,data.data.user.rolUsuario,data.data.user.telefonoUsuario,data.data.user.generoUsuario,data.data.user.fechaNacimientoUsuario);
  
  
      router.replace("/home");
    } catch (error) {
    
      if (axios.isAxiosError(error) && error.response) {
      
        Alert.alert("Error", error.response.data.message || "Credenciales incorrectas.");
      } else {
    
        Alert.alert("Error", "No se pudo conectar al servidor.");
      }
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.titulo}>Iniciar sesión</Text>
      </View>
      <View style={styles.Text}>
        <Text style={styles.textContainer}>Email</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Escribe tu email"
          placeholderTextColor={"grey"}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.Text}>
        <Text style={styles.textContainer}>Contraseña</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Escribe tu contraseña"
          placeholderTextColor={"grey"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={{ marginTop: height * 0.02, alignSelf: "center", width: "85%" }}
      >
        <Text style={{ color: "#D4AF37" }}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttom} onPress={handleLogin}>
        <Text style={styles.textButtom}>Inicia sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export const screenOptions = {
  headerShown: false,
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
  Text: {
    color: '#fff',
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#D2D1CE',
    borderRadius: 5,
    width: '90%',
    marginTop: height * 0.01,
    color: '#fff',
    height: height * 0.05,
    paddingLeft: width * 0.03,
  },
  textContainer: {
    width: '90%',
    color: '#fff',
    fontWeight: 'bold',
  },


  buttom: {
    backgroundColor: '#D4AF37',
    width: width * 0.4,
    height: height * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.05,
    borderRadius: 5,
  },
  textButtom: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
  
  },
});