import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
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
  const { email } = params;


  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });


 



  const recover = async () => {
    try {
      const response = await axios.post(`${backend}/api/auth/enviarcorreo`, { correo: email });
      
      if (response.data.success) {
        Alert.alert("Código reenviado", "Revisa tu correo nuevamente.");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo reenviar el código.");
      console.error("Error al reenviar código:", error);
    }
  };




  const verificarCodigo = async () => {
    try {
      const response = await axios.post(`${backend}/api/auth/codigoverificacion`, {
        correo: email,
        codigo: value,
      });

      if (response.data.success) {
        router.push({
          pathname: '/login/NewPassword',
          params: { 
            email: email,
          }
        });
   
      } else {
        Alert.alert("Código Incorrecto", "El código ingresado no es válido.");
        
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo verificar el código.");
      console.error("Error al verificar código:", error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>Introduce el código</Text>
      <Text style={styles.description}>
        Le enviamos un código de 4 dígitos a {"\n"} {email}
      </Text>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
            <Text style={styles.cellText}>{symbol || "•"}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.buttom} onPress={verificarCodigo}>
        <Text style={styles.textButtom}>Continuar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.Textcontainer]} onPress={recover}>
        <Text style={styles.Text}>Reenviar Código</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
     alignItems: "center"
  },
  Textcontainer :{
    marginTop: height * 0.03,
  },
  Text:{
    color: "#D4AF37",
    fontWeight: "bold",
  },

  title: {
    
    marginTop: height * 0.05,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#D4AF37",
  },
  description: {
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    textAlign: "center",
    color: "#898D8F",
  },
  buttom: {
    backgroundColor: "#D4AF37",
    width: width * 0.4,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
    borderRadius: 5,
  },
  reenviar: {
    backgroundColor: "#898D8F", 
    marginTop: height * 0.02,
  },
  textButtom: {
    color: "white",
    fontWeight: "500",
  },
  codeFieldRoot: {
    
    marginTop: 20,
    width: '80%',
    marginLeft : 2,
    justifyContent: "space-between",
    alignItems: "center"
  },
  cell: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    textAlign: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  cellText: {
    fontSize: 24,
    color: "#000",
    
  },
  focusCell: {
    borderColor: "#BDB76B", 
  },
});


