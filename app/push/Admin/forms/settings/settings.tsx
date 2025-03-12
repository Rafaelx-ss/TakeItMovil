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
import MenuItem from "./MenuItem";
import { useRouter } from 'expo-router';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function PerfilScreen() {
    const {username, email, fechaNacimientoUsuario, telefonoUsuario, logout} = useAuth();
    const router = useRouter();
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.content}>
            {/* Header with back button */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color="#E0B942" />
              </TouchableOpacity>
            </View>
  
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <Image
                source={require("@/images/profile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>{username}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              <MenuItem icon="photo-camera" text="Cambiar Foto" onPress={() => router.push('/push/Admin/forms/settings/ChangePhotoScreen')}/>
              <MenuItem icon="phone" text="Teléfono" onPress={() => router.push('/push/Admin/forms/settings/ChangePhoneScreen')}/>
              <MenuItem icon="lock" text="Contraseña" onPress={() => router.push('/push/Admin/forms/settings/ChangePasswordScreen')}/>
              <MenuItem icon="email" text="Correo electrónico" onPress={() => router.push('/push/Admin/forms/settings/ChangeEmailScreen')}/>
              <MenuItem icon="location-on" text="Dirección" onPress={() => router.push('/push/Admin/forms/settings/ChangeAdressScreen')}/>
              <MenuItem icon="logout" text="Cerrar Sesión" onPress={logout} style={styles.deleteAccount} />
            </View>
          </View>
  
            {/* Menu Items */}
            {/* <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="photo-camera" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Cambiar Foto</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="phone" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Teléfono</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="lock" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Contraseña</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="email" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Correo electrónico</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="location-on" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Dirección</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
  
              <TouchableOpacity style={[styles.menuItem, styles.deleteAccount]} onPress={logout}>
                <View style={styles.menuItemLeft}>
                  <MaterialIcons name="logout" size={24} color="#E0B942" />
                  <Text style={styles.menuItemText}>Cerrar Sesión</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#E0B942" />
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    content: {
      flex: 1,
      marginTop: height * 0.05,
      zIndex: 3,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    profileName: {
      fontSize: 24,
      color: '#E0B942',
      fontWeight: 'bold',
    },
    menuContainer: {
      paddingHorizontal: 20,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#333333',
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    menuItemText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    deleteAccount: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#333333',
    }
  });