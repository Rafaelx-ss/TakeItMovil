import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { backend } from '@/context/endpoints';
import { EventosService } from '@/services/events.service';
import { Evento } from '@/types/eventos';
import { useAuth } from '@/context/AuthContext';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import SkeletonLoader from '@/components/eventos/SkeletonLoader';
import Modal from 'react-native-modal';
import { SvgUri } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function EventoDetalle() {
  const { id } = useLocalSearchParams();
  const { usuarioID } = useAuth();
  const router = useRouter();
  const [registering, setRegistering] = useState(false);
  const [event, setEvent] = useState<Evento | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    EventosService.obtenerEvento(Number.parseInt(Array.isArray(id) ? id[0] : id))
      .then((response) => {
        setEvent(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleRegistration = () => {
    setRegistering(true);
    if (usuarioID) {
      EventosService.inscribirUsuario(Number.parseInt(Array.isArray(id) ? id[0] : id), usuarioID)
        .then((response: any) => {
          console.log('Respuesta del backend:', response); // Agrega este log

          setRegistering(false);
          setQrCode(response.data[0].rutaqr); 
          setModalVisible(true); 
        })
        .catch((error) => {
          setRegistering(false);
          Alert.alert('Error al inscribirse al evento:', error.response.data.message || 'Error desconocido');
        });
    }
  };

  const formatDate = (dateStr: string) => {

    const date = new Date(dateStr);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={
            event?.imagenEvento
              ? { uri: `${backend}/${event.imagenEvento.replace(/\\/g, "")}` }
              : require("@/images/mario-kart.png")
          }

          style={styles.image}
        />
        <LinearGradient
          colors={['transparent', 'rgba(26, 26, 26, 0.8)', '#1A1A1A']}
          style={styles.gradient}
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event?.nombreEvento}</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeItem}>

              <MaterialIcons name="event" size={20} color="#E0B942" />
              <Text style={styles.dateTimeText}>{formatDate(event?.fechaEvento || '')}</Text>
            </View>
            <View style={styles.dateTimeItem}>
              <MaterialIcons name="access-time" size={20} color="#E0B942" />
              <Text style={styles.dateTimeText}>{event?.horaEvento} hrs</Text>
            </View>
          </View>
        </View>


        <View style={styles.mainInfoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-on" size={24} color="#E0B942" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Ubicación</Text>
              <Text style={styles.infoText}>{event?.lugarEvento}</Text>
              <Text style={styles.infoSubtext}>{event?.direccionEvento}</Text>
              <Text style={styles.infoSubtext}>{event?.municioEvento}, CP: {event?.cpEvento}</Text>
            </View>
          </View>


          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="users" size={20} color="#E0B942" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Capacidad</Text>
              <Text style={styles.infoText}>{event?.maximoParticipantesEvento} participantes</Text>
            </View>
          </View>


          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="attach-money" size={24} color="#E0B942" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Costo de Inscripción</Text>
              <Text style={styles.infoText}>${event?.costoEvento} MXN</Text>
            </View>
          </View>


          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="timer" size={24} color="#E0B942" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Duración</Text>
              <Text style={styles.infoText}>{event?.duracionEvento}</Text>
            </View>
          </View>

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción del Evento</Text>
          <Text style={styles.description}>{event?.descripcionEvento}</Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kit del Participante</Text>
          <View style={styles.kitContainer}>
            {event?.kitEvento?.split(',').map((item, index) => (
              <View key={index} style={styles.kitItem}>
                <MaterialIcons name="star" size={20} color="#E0B942" />
                <Text style={styles.kitText}>{item.trim()}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>{event?.telefonoEvento}</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={[styles.registerButton, registering && styles.registeringButton]}
          onPress={handleRegistration}
          disabled={registering}
        >
          <Text style={styles.registerButtonText}>
            {registering ? "Procesando inscripción..." : "¡Inscríbete Ahora!"}
          </Text>
          {!registering && <MaterialIcons name="arrow-forward" size={24} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
      {/* Modal de éxito */}
      <Modal isVisible={modalVisible} animationIn="slideInUp" animationOut="slideOutDown" backdropColor="black" backdropOpacity={0.5}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>¡Registro Exitoso! 🎮</Text>
          <Text style={{ marginTop: 10, textAlign: 'center', marginBottom: 20 }}>¡Felicidades! Te has registrado exitosamente al evento.</Text>

          {qrCode && (
            <>
            {Platform.OS === 'web' ? (
                <Image 
                    source={{ uri: `${backend}/storage/${qrCode.replace(/\\/g, "")}` }} 
                    style={{ width: 100, height: 100, marginTop: 10 }} 
                />
            ) : (
                <SvgUri 
                    uri={`${backend}/storage/${qrCode.replace(/\\/g, "")}`} 
                    width={250} 
                    height={250} 
                />
            )}
              {/* <Text style={{ fontSize: 14, color: '#555' }}>{`${backend}/storage/${qrCode.replace(/\\/g, "")}`}</Text> */}
            </>
          )}

          <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>¡Tomale captura de pantalla!</Text>
          <Text style={{ textAlign: 'center'}}>Esta es tu entrada para el evento</Text>


          <TouchableOpacity onPress={() => router.back()}>

            <Text style={{ color: '#E0B942', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>¡Excelente!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  skeletonBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  imageContainer: {
    height: 350,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    marginTop: -50,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  mainInfoCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: '#E0B942',
    fontSize: 14,
    marginBottom: 4,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#3A3A3A',
    marginVertical: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 24,
  },
  kitContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
  },
  kitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  kitText: {
    color: '#FFFFFF',
    marginLeft: 12,
    fontSize: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    backgroundColor: '#E0B942',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
    gap: 8,
  },
  registeringButton: {
    backgroundColor: '#CC8400',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});