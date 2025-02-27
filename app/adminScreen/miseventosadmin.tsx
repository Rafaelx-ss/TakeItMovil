import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import HeaderGradient from '@/components/HeaderGradient';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';
import { EventosService } from '@/services/events.service';
import { useAuth } from '@/context/AuthContext';

export default function MisEventosAdminScreen() {
  const route = useRouter();
  const { usuarioID } = useAuth();

  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const isFirstRender = useRef(true);
  const isFetching = useRef(false); // Evita peticiones múltiples al hacer scroll

  useEffect(() => {
    if (usuarioID && isFirstRender.current) {
      fetchEvents(1, true);
      isFirstRender.current = false;
    }
  }, [usuarioID]);

  const fetchEvents = async (pageNumber: number, refresh = false) => {
    if (!hasMore || isFetching.current) return;

    isFetching.current = true; // Bloquea más peticiones mientras esta en progreso

    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await EventosService.obtenerEventosAdmin(usuarioID, pageNumber);
      console.log("🔹 Respuesta de la API:", response);

      const newEvents = response ?? []; // Asegura que la API devuelve un array válido

      if (!Array.isArray(newEvents)) {
        console.warn("⚠ La API no devolvió un array en 'data':", newEvents);
        return;
      }

      if (newEvents.length === 0) {
        setHasMore(false);
      } else {
        setEvents(refresh ? newEvents : [...events, ...newEvents]);
        setPage(pageNumber + 1);
      }
    } catch (error) {
      console.error('❌ Error obteniendo eventos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      isFetching.current = false; // Libera la petición para nuevas llamadas
    }
  };

  const onRefresh = () => {
    setHasMore(true);
    fetchEvents(1, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderGradient title="Mis Eventos" style={{ marginBottom: 15 }}
       rightButtonText="Crear"
      rightButtonIcon="add"
       onRightButtonPress={() => route.push("/forms/CrearEvento")} />

      <FlatList
        data={events}
        keyExtractor={(item) => item.eventoID.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <Image
              source={item.imagenEvento ? { uri: `${backend}/${item.imagenEvento.replace(/\\/g, "")}` } : require("@/images/mario-kart.png")}
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTitle}>{item.nombreEvento}</Text>
                <Text style={styles.eventPrice}>{item.categoriaNombre}</Text>
              </View>
              <Text style={styles.eventCategory}>{item.categoriaNombre}</Text>
              <View style={styles.eventDetails}>
                <Text style={styles.eventDate}>{item.fechaEvento}</Text>
                <Text style={styles.eventLocation}>{item.lugarEvento}</Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={loading && hasMore ? <ActivityIndicator size="large" color="#E0B942" /> : null}
        onEndReached={() => {
          if (!loading && hasMore) {
            fetchEvents(page);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    width: "100%",
    height: "100%",
  },
  eventCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  eventImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  eventInfo: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E0B942",
  },
  eventCategory: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 8,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDate: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 4,
  },
});
