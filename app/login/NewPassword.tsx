import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { backend } from '@/context/endpoints';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const params = useLocalSearchParams();
  const { email } = params;

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Por favor, completa ambos campos.");
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(`${backend}/api/auth/newpassword`, {
        correo : email,
        password : newPassword,
      });

      Alert.alert("Éxito", "Tu contraseña ha sido cambiada exitosamente.", [
        { text: "OK", onPress: () => router.push("/login") },
      ]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert("Error", error.response.data.message || "No se pudo cambiar la contraseña.");
      } else {
        Alert.alert("Error", "No se pudo conectar al servidor.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.titulo}>Cambiar Contraseña</Text>
      </View>

      <View style={styles.Text}>
        <Text style={styles.textContainer}>Nueva Contraseña</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Escribe tu nueva contraseña"
          placeholderTextColor={"grey"}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.Text}>
        <Text style={styles.textContainer}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirma tu nueva contraseña"
          placeholderTextColor={"grey"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.buttom} onPress={handleChangePassword}>
        <Text style={styles.textButtom}>Cambiar Contraseña</Text>
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
    width: width * 0.6,
    height: height * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.05,
    borderRadius: 5,
  },
  textButtom: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});
