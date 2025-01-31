import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EventosService } from "@/services/events.service"
import { useRouter } from "expo-router"
import { Evento } from "@/types/eventos"
import { useAuth } from "../../context/AuthContext";

export default function EventosScreen() {
  const route = useRouter();
  const [eventosstarting, setEventosstarting] = useState<Evento[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {  usuarioID, token,rol, fechaNacimientoUsuario } = useAuth()

  console.log(usuarioID)
  console.log(fechaNacimientoUsuario)

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await EventosService.eventosstarting();
      const featuredEvents = response?.data || []; 

      if (featuredEvents.length === 0) {
        setHasMore(false); 
      } else {
        setEventosstarting(featuredEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setEventosstarting([]);
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error refreshing events:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
      fetchData();
    }, []);

  // const featuredEvents = [
  //   {
  //     id: 1,
  //     title: "Torneo Mario Kart",
  //     image: require("@/images/mario-kart.png"),
  //     startTime: "Inicia mañana",
  //   },
  //   {
  //     id: 2,
  //     title: "Competencia",
  //     image: require("@/images/swimming.png"),
  //     startTime: "Inicia en 2 días",
  //   },
  // ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Relevos 10KM",
      category: "Deporte",
      date: "09 de Septiembre, 2024",
      location: "Mérida, Centro",
      price: "300MNX",
      image: require("@/images/running.png"),
      status: "Inscrito",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#E0B942']}
            tintColor="#E0B942"
          />
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("@/images/eventhome.png")}
            style={styles.image}
          />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 1)"]}
            locations={[0.1, 0.9]} 
            style={styles.gradient}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.startSection}>
            <Text style={styles.startTitle}>¡A punto de empezar!</Text>
            <Text style={styles.startSubtitle}>Inscríbete al evento, quedan pocos lugares...</Text>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {loading ? (
              // Skeleton loader mientras carga
              Array.from({ length: 3 }).map((_, index) => (
                <View key={index} style={styles.featuredCard}>
                  <View style={[styles.featuredImage, { backgroundColor: "#2A2A2A" }]} />
                  <View style={styles.featuredInfo}>
                    <View style={[styles.skeletonText, { width: "70%", backgroundColor: "#2A2A2A" }]} />
                    <View style={[styles.skeletonText, { width: "50%", backgroundColor: "#2A2A2A", marginTop: 8 }]} />
                  </View>
                </View>
              ))
            ) : (
              // Contenido real cuando ya ha cargado
              eventosstarting.map((event) => (
                <TouchableOpacity key={event.eventoID} style={styles.featuredCard} onPress={() => event.eventoID && route.push(`/inscriptions/${event.eventoID}`)}>
                  <Image
                    source={event.imagenEvento ? event.imagenEvento : require("@/images/mario-kart.png")}
                    style={styles.featuredImage}
                  />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredTitle}>{event.nombreEvento}</Text>
                    <Text style={styles.featuredTime}>{event.fechaEvento}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
            </ScrollView>
          </View>

          <View style={styles.upcomingSection}>
            <Text style={styles.sectionTitle}>Próximos eventos</Text>
            
            <View style={styles.searchContainer}>
              <TextInput 
                style={styles.searchInput}
                placeholder="¿Buscas algo en específico?"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Sep ▼</Text>
              </TouchableOpacity>
              <View style={styles.categories}>
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={styles.categoryText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryButton, styles.categoryActive]}>
                  <Text style={[styles.categoryText, styles.categoryActiveText]}>Deportes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={styles.categoryText}>Arte</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryButton}>
                  <Text style={styles.categoryText}>Tecnología</Text>
                </TouchableOpacity>
              </View>
            </View>

            {upcomingEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Image source={event.image} style={styles.eventImage} />
                <View style={styles.eventInfo}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventPrice}>${event.price}</Text>
                  </View>
                  <Text style={styles.eventCategory}>{event.category}</Text>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventDate}>{event.date}</Text>
                    <Text style={styles.eventLocation}>{event.location}</Text>
                    <Text style={styles.eventStatus}>{event.status}</Text>
                  </View>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Ver Detalles</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  imageContainer: {
    width: "100%",
    height: 350, 
    position: "relative",
    overflow: "hidden",
    zIndex: 1,
  },
  image: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "90%",
    zIndex: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -50,
    zIndex: 3,
  },
  startSection: {
    marginBottom: 24,
  },
  startTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  startSubtitle: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 16,
  },
  featuredScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1A1A1A",
  },
  skeletonText: {
    height: 17,
    borderRadius: 6,
    backgroundColor: "#2A2A2A", 
  },
  featuredImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  featuredInfo: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  featuredTime: {
    fontSize: 12,
    color: "#E0B942",
  },
  upcomingSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
  },
  filterButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  categories: {
    flexDirection: "row",
    flex: 1,
  },
  categoryButton: {
    marginRight: 12,
  },
  categoryText: {
    color: "#999999",
    fontSize: 14,
  },
  categoryActive: {
    backgroundColor: "transparent",
  },
  categoryActiveText: {
    color: "#E0B942",
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
  eventStatus: {
    fontSize: 14,
    color: "#4CAF50",
  },
  detailsButton: {
    backgroundColor: "#E0B942",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#999999",
  },
  tabActive: {
    color: "#E0B942",
  },
});