import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderGradient from '@/components/HeaderGradient';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import SkeletonLoader from '@/components/eventos/SkeletonLoader';
import { useState } from 'react';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';

export default function MisEventosScreen() {
  const route = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventosstarting, setEventosstarting] = useState<Evento[]>([]);

  
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
    {
      id: 2,
      title: "Relevos 10KM",
      category: "Deporte",
      date: "09 de Septiembre, 2024",
      location: "Mérida, Centro",
      price: "300MNX",
      image: require("@/images/running.png"),
      status: "Inscrito",
    },
    {
      id: 3,
      title: "Relevos 10KM",
      category: "Deporte",
      date: "09 de Septiembre, 2024",
      location: "Mérida, Centro",
      price: "300MNX",
      image: require("@/images/running.png"),
      status: "Inscrito",
    },
    {
      id: 4,
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
      <HeaderGradient
        title="Mis Eventos"
        style={{marginBottom: 15}}
      />
      <ScrollView>
      <View style={styles.content}>


        <View style={styles.upcomingSection}>
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