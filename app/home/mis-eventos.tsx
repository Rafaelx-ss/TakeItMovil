"use client"

import { useState } from "react"
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
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

export default function EventosScreen() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    // Aquí iría la lógica para recargar los eventos
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const events = [
    {
      id: 1,
      title: "Torneo de Smash (Winter Fest 2024)",
      createdDate: "26 de noviembre del 2024",
      startDate: "29 de noviembre del 2024",
      participants: 30,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03Pi5hi3wdVc4qQA9yX1a4njCXuZ43.png",
    },
    {
      id: 2,
      title: "Torneo de Smash (Winter Fest 2024)",
      createdDate: "26 de noviembre del 2024",
      startDate: "29 de noviembre del 2024",
      participants: 30,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03Pi5hi3wdVc4qQA9yX1a4njCXuZ43.png",
    },
    {
      id: 3,
      title: "Torneo de Smash (Winter Fest 2024)",
      createdDate: "26 de noviembre del 2024",
      startDate: "29 de noviembre del 2024",
      participants: 30,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03Pi5hi3wdVc4qQA9yX1a4njCXuZ43.png",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#E0B942"]} tintColor="#E0B942" />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tus eventos</Text>
          <Text style={styles.subtitle}>Encuentra tus eventos inscritos</Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#666" />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.filterDot} />
            <Text style={[styles.filterText, styles.activeFilterText]}>Próximos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem}>
            <Text style={styles.filterText}>Creados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterItem}>
            <Text style={styles.filterText}>Historial asistido</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsContainer}>
          {events.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.eventMetaContainer}>
                  <View style={styles.eventMeta}>
                    <Icon name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.eventMetaText}>Creado: {event.createdDate}</Text>
                  </View>
                  <View style={styles.eventMeta}>
                    <Icon name="time-outline" size={16} color="#666" />
                    <Text style={styles.eventMetaText}>Inicia: {event.startDate}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.participantsBadge}>
                <Icon name="person" size={14} color="#000" />
                <Text style={styles.participantsText}>{event.participants}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Icon name="add" size={24} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: "#000000",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E0B942",
    marginRight: 6,
  },
  filterText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#E0B942",
    fontWeight: "600",
  },
  eventsContainer: {
    padding: 16,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  eventImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  eventInfo: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E0B942",
    marginBottom: 8,
  },
  eventMetaContainer: {
    gap: 4,
  },
  eventMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventMetaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  participantsBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0B942",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  participantsText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E0B942",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})





// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import HeaderGradient from '@/components/HeaderGradient';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, ScrollView, RefreshControl } from 'react-native';
// import SkeletonLoader from '@/components/eventos/SkeletonLoader';
// import { useEffect, useState } from 'react';
// import { Evento } from '@/types/eventos';
// import { backend } from '@/context/endpoints';
// import { EventosService } from '@/services/events.service';
// import { useAuth } from '@/context/AuthContext';


// export default function MisEventosScreen() {
//   const route = useRouter();
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [myEvents, setMyEvents] = useState<Evento[]>([]);
//   const { usuarioID } = useAuth();

//   useEffect(() => {
//     if (usuarioID) {
//       EventosService.obtenerEventosUsuario(usuarioID)
//         .then((response: any) => {
//           setMyEvents(response.data);
//           setRefreshing(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching events:', error);
//       });
//     }
//   }, [refreshing]);

//   const onRefresh = async () => {
//     setMyEvents([]);
//     setRefreshing(true);
//   };

//   // const upcomingEvents = [
//   //   {
//   //     eventoID: 1,
//   //     nombreEvento: "Relevos 10KM",
//   //     categoriaNombre: "Deporte",

//   //     fechaEvento: "09 de Septiembre, 2024",
//   //     lugarEvento: "Mérida, Centro",
//   //     costoEvento: "300MNX",
//   //     imagenEvento: require("@/images/running.png"),
//   //   },
//   //   {
//   //     eventoID: 2,
//   //     nombreEvento: "Relevos 10KM",
//   //     categoriaNombre: "Deporte",
//   //     fechaEvento: "09 de Septiembre, 2024",
//   //     lugarEvento: "Mérida, Centro",
//   //     costoEvento: "300MNX",
//   //     imagenEvento: require("@/images/running.png"),

//   //   },
//   //   {
//   //     eventoID: 3,
//   //     nombreEvento: "Relevos 10KM",
//   //     categoriaNombre: "Deporte",
//   //     fechaEvento: "09 de Septiembre, 2024",
//   //     lugarEvento: "Mérida, Centro",
//   //     costoEvento: "300MNX",
//   //     imagenEvento: require("@/images/running.png"),


//   //   },
//   //   {
//   //     eventoID: 4,
//   //     nombreEvento: "Relevos 10KM",
//   //     categoriaNombre: "Deporte",
//   //     fechaEvento: "09 de Septiembre, 2024",
//   //     lugarEvento: "Mérida, Centro",
//   //     costoEvento: "300MNX",
//   //     imagenEvento: require("@/images/running.png"),

//   //   },
//   // ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <HeaderGradient
//         title="Mis Eventos"
//         style={{marginBottom: 15}}
//       />
//       <ScrollView
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={['#E0B942']}
//           tintColor="#E0B942"
//         />
//       }
//       >
//         <View style={styles.content}>
//           <View style={styles.upcomingSection}>
//             {myEvents.map((event) => (
//               <View key={event.eventoID} style={styles.eventCard}>
//                 <Image
//                   source={
//                     event.imagenEvento
//                       ? { uri: `${backend}/${event.imagenEvento.replace(/\\/g, "")}` }
//                       : require("@/images/mario-kart.png")
//                   }
//                   style={styles.eventImage}
//                 />
//                 <View style={styles.eventInfo}>

//                   <View style={styles.eventHeader}>

//                     <Text style={styles.eventTitle}>{event.nombreEvento}</Text>
//                     <Text style={styles.eventPrice}>Inscrito</Text>
//                   </View>

//                   <Text style={styles.eventCategory}>{event.categoriaNombre}</Text>
//                   <View style={styles.eventDetails}>
//                     <Text style={styles.eventDate}>{event.fechaEvento}</Text>
//                     <Text style={styles.eventLocation}>{event.lugarEvento}</Text>
//                   </View>
//                 </View>

//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0F0F0F",
//     width: "100%",
//     height: "100%",
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   upcomingSection: {
//     flex: 1,
//   },
//   eventCard: {
//     backgroundColor: "#1A1A1A",
//     borderRadius: 12,
//     overflow: "hidden",
//     marginBottom: 16,
//   },
//   eventImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//   },
//   eventInfo: {
//     padding: 16,
//   },
//   eventHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   eventTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#FFFFFF",
//   },
//   eventPrice: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#E0B942",
//   },
//   eventCategory: {
//     fontSize: 14,
//     color: "#999999",
//     marginBottom: 8,
//   },
//   eventDetails: {
//     marginBottom: 12,
//   },
//   eventDate: {
//     fontSize: 14,
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   eventLocation: {
//     fontSize: 14,
//     color: "#999999",
//     marginBottom: 4,
//   },
// }); 