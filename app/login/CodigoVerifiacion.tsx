import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { backend } from '@/context/endpoints';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';


const CELL_COUNT = 4;

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function CodigoVerifiacion() {
     const [codigo, setCodigo] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const {  email } = params;

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  console.log(email)

  const recover = async () => {
    try {
     
      const response = await axios.post(`${backend}/api/auth/enviarcorreo`, {
        correo : email,
      });
      
     console.log(response.data.success)
     if(response.data.success == true){
        Alert.alert('Codigo reenviado')

     }else{
      Alert.alert(response.data.message)
     }
    
    } catch (error) {
    
    }
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Introduce el código</Text>

      <Text style={styles.description}>Le enviamos un código de 4 dígitos al {'\n'} {email} </Text>

      <View style={styles.Text}>
        <Text style={styles.textContainer}>Codigo</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Escribe tu email"
          placeholderTextColor={"grey"}
          value={codigo}
          onChangeText={setCodigo}
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
    color: '#898D8F',
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