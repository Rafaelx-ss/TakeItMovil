import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@/context/AuthContext"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import type { RouteProp } from '@react-navigation/native';
// Use userouter for expo
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';


type RootStackParamList = {
  Perfil: undefined;
  Settings: undefined;
  'settings/settings': undefined;
};

export default function PerfilScreen() {
  const router = useRouter();
  const {username,email,fechaNacimientoUsuario,telefonoUsuario, direccion, logout} = useAuth();

  // Función para formatear el nombre
  const formatName = (fullName: string | null) => {
    if (!fullName) {
      return {
        firstName: '',
        lastName: ''
      };
    }
    
    const names = fullName.trim().split(' ');
    if (names.length > 2) {
      // Si hay más de dos palabras, tomar el primer nombre y el antepenúltimo
      return {
        firstName: names[0],
        lastName: names[names.length - 2] // Cambiamos -1 por -2 para tomar el antepenúltimo
      };
    }
    return {
      firstName: names[0],
      lastName: names[1] || '' // Si solo hay un nombre o dos, se mantiene igual
    };
  };

  const formattedName = formatName(username);

  const profileData = {
    user: {
      firstName: formattedName.firstName,
      lastName: formattedName.lastName,
      email: email,
      birthDate: fechaNacimientoUsuario,
      address: direccion,
      website: "",
      phone: telefonoUsuario,
      profileImage: require("@/images/profile.png")
    }
  };

  const { user } = profileData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {/* Header */}
          
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Perfil</Text>
            <TouchableOpacity 
              onPress={() => router.push('/push/User/settings/settings')}>
              <MaterialIcons name="settings" size={24} color="#E0B942" />
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <View style={styles.infoSection}>
            {/* Profile Info */}
            <View style={styles.profileSection}>
              <Image
                source={user.profileImage}
                style={styles.profileImage}
              />
              <View style={styles.nameContainer}>
                <Text 
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user.firstName}
                </Text>
                {user.lastName && (
                  <Text 
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user.lastName}
                  </Text>
                )}
              </View>
            </View>

          
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Fecha de nacimiento</Text>
              <Text style={styles.infoValue}>{user.birthDate}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Dirección</Text>
              <Text style={styles.infoValue}>{user.address}</Text>
            </View>
          </View>

          {/* Social Media */}
          <View style={styles.socialSection}>
            <Text style={styles.sectionTitle}>Redes sociales</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>in</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>𝕏</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>f</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialButtonText}>📸</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.contactSection}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Sitio WEB</Text>
              <Text style={styles.contactValue}>{user.website}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Teléfono</Text>
              <Text style={styles.contactValue}>{user.phone}</Text>
            </View>
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
    
  },
  content: {
    flex: 1,
    marginTop: height * 0.05,
    zIndex: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    paddingRight: 16,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  nameContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 10,
    maxWidth: '70%',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 34,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  infoSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    color: '#E0B942',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  socialSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  socialButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#E0B942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 18,
    color: '#0A0A0A',
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 13,
    color: '#E0B942',
  },
  contactValue: {
    fontSize: 13,
    color: '#FFFFFF',
  },
});