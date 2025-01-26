import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ReguistreLike() {
  const progress = 45;
  const router = useRouter();

  const [preferences, setPreferences] = useState([
    { id: 1, name: "Deportes", selected: false },
    { id: 2, name: "Arte", selected: false },
    { id: 3, name: "Tecnología", selected: false },
    { id: 4, name: "Negocios", selected: false },
    { id: 5, name: "Moda", selected: false },
    { id: 6, name: "Educación", selected: false },
    { id: 7, name: "Cultura", selected: false },
  ]);

  const togglePreference = (id) => {
    setPreferences((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const renderPreference = ({ item }) => (
    <TouchableOpacity
      style={styles.preferenceItem}
      onPress={() => togglePreference(item.id)}
    >
      <View
        style={[
          styles.checkbox,
          { backgroundColor: item.selected ? "#FCA311" : "#1A1A1A" },
        ]}
      />
      <Text style={[styles.preferenceText, { color: item.selected ? "#FCA311" : "#fff" }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: height * 0.05,
          marginLeft: width * 0.05,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <Icon
          style={{ marginTop: height * 0.005 }}
          name={"chevron-left"}
          size={20}
          color="#FCA311"
        />
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View>
        <Text style={styles.titulo}>Dinos, ¿En qué eres bueno?</Text>
        <Text style={styles.subtitulo}>
          Ingresa tus preferencias de eventos para mejorar tu experiencia....
        </Text>
      </View>

      <FlatList
        data={preferences}
        renderItem={renderPreference}
        keyExtractor={(item) => item.id.toString()}
        style={styles.preferenceList}
      />

      <TouchableOpacity style={styles.buttom} onPress={() => router.push('/login/ReguisteData')}>
                      <Text style={styles.textButtom}>Continuar</Text>
                    </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    paddingBottom: height * 0.20,
  },
  titulo: {
    fontSize: 30,
    color: "#fff",
    marginLeft: width * 0.05,
    marginTop: height * 0.05,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#6E7375",
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginTop: height * 0.01,
    fontSize: 20,
  },
  progressContainer: {
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 2.5,
    overflow: "hidden",
    width: "90%",
    alignSelf: "center",
    marginTop: height * 0.02,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#D4AF37",
  },
  preferenceList: {
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#FCA311",
    marginRight: 12,
  },
  preferenceText: {
    fontSize: 18,
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
