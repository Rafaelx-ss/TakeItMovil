import React from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";

export default function ResultsScreen() {
  const categories = ["Eventos inscritos", "Deportes", "Arte", "Tech"];

  const events = [
    {
      id: 1,
      title: "Relevos 10KM",
      category: "Deporte",
      date: "Terminó: 29 de noviembre del 2024",
      location: "Mérida, Centro",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qMVciNxoJKqhGKT6eCGRlOcs56F4VX.png",
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Resultados</Text>
          <Text style={styles.subtitle}>Busca un evento y revisa los resultados</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search color="#666" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                index === 0 && styles.categoryButtonActive
              ]}
            >
              {index === 0 && <View style={styles.dot} />}
              <Text style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.eventsContainer}>
          {events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Image
                source={{ uri: event.image }}
                style={styles.eventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventCategory}>{event.category}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Ver Resultados</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    backgroundColor: "#1A1A1A",
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  categoryButtonActive: {
    backgroundColor: "#E0B942",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginRight: 6,
  },
  categoryText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  categoryTextActive: {
    color: "#000000",
    fontWeight: "600",
  },
  eventsContainer: {
    padding: 16,
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
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  eventCategory: {
    fontSize: 14,
    color: "#E0B942",
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#E0B942",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
