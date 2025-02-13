import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { backend } from '@/context/endpoints';




const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const recover = async () => {
    try {

      if(!email){
        Alert.alert('Tienes que introducir el email')
      }
     
      const response = await axios.post(`${backend}/api/auth/enviarcorreo`, {
        correo : email,
      });
      
     console.log(response.data.success)
     if(response.data.success == true){
      router.push({
        pathname: '/login/CodigoVerifiacion',
        params: { 
          email: email,
        }
      });

      console.log(response.data)

     }else{
      Alert.alert(response.data.message)
      console.log(response.data)
     }
    
    } catch (error) {
    
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Restablece tu contraseña</Text>
      <Text style={styles.description}>
        Introduce
        <Text style={{fontWeight: 'bold'}}>
          {' '}
          el email con el que te registraste previamente.{' '}
        </Text>
        Enviaremos un enlace al{'\n'} correo para que puedas recuperar tu {'\n'}
        cuenta.
      </Text>

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


      <TouchableOpacity style={styles.buttom} onPress={recover}>
        <Text style={styles.textButtom}>Continual</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.1,
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    textAlign: 'center',
    color: '#fff',
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