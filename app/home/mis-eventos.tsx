import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderGradient from '@/components/HeaderGradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import SkeletonLoader from '@/components/eventos/SkeletonLoader';
import { useEffect, useState } from 'react';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';
import { EventosService } from '@/services/events.service';
import { useAuth } from '@/context/AuthContext';


export default function MisEventosScreen() {
  const route = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myEvents, setMyEvents] = useState<Evento[]>([]);
  const { usuarioID } = useAuth();

  useEffect(() => {
    if (usuarioID) {
      EventosService.obtenerEventosUsuario(usuarioID)
        .then((response: any) => {
          setMyEvents(response.data);
          setRefreshing(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
    }
  }, [refreshing]);

  const onRefresh = async () => {
    setMyEvents([]);
    setRefreshing(true);
  };

 
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGradient
        title="Mis Eventos"
        style={{marginBottom: 15}}
      />
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#E0B942']}
          tintColor="#E0B942"
        />
      }
      >
        <View style={styles.content}>
          <View style={styles.upcomingSection}>
            {myEvents.map((event) => (
              <TouchableOpacity
              key={event.eventoID}
              style={styles.eventCard}
              onPress={() => route.push(`/push/User/InfoMiEvento/${event.eventoID}`)}
              >
                <Image
                  source={
                    event.imagenEvento
                      ? { uri: `${backend}/${event.imagenEvento.replace(/\\/g, "")}` }
                      : require("@/images/mario-kart.png")
                  }
                  style={styles.eventImage}
                />
                <View style={styles.eventInfo}>

                  <View style={styles.eventHeader}>

                    <Text style={styles.eventTitle}>{event.nombreEvento}</Text>
                    <Text style={styles.eventPrice}>Inscrito</Text>
                  </View>

                  <Text style={styles.eventCategory}>{event.categoriaNombre}</Text>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDate}>{event.fechaEvento}</Text>
                    <Text style={styles.eventLocation}>{event.lugarEvento}</Text>
                  </View>
                </View>
                </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  upcomingSection: {
    flex: 1,
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