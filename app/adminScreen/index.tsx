import React from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { User, Medal, BarChart } from "lucide-react-native";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function Dashboard() {
  const totalParticipantes = 150;
  const eventosFinalizados = 25;
  const tasaActividad = "43%";

  const graficaData = {
    labels: ["Enero", "Febrero", "Marzo"],
    datasets: [{ data: [50, 80, 40] }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Participantes Totales</Text>
          <User color="#D4AF37" size={24} />
          <Text style={styles.cardValue}>{totalParticipantes}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Eventos Completados</Text>
          <Medal color="#D4AF37" size={24} />
          <Text style={styles.cardValue}>{eventosFinalizados}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tasa de Actividad</Text>
          <BarChart color="#D4AF37" size={24} />
          <Text style={styles.cardValue}>{tasaActividad}</Text>
        </View>
      </View>

      <Text style={styles.chartTitle}>Tendencia de Participantes</Text>
      <LineChart
        data={graficaData}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#222",
          backgroundGradientFrom: "#1A1A1A",
          backgroundGradientTo: "#1A1A1A",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(212, 175, 55, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#D4AF37",
          },
        }}
        bezier
        style={{ marginVertical: 10, borderRadius: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: width* 0.1,
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#222",
    width: width * 0.3,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
  },
  cardValue: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  noData: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
