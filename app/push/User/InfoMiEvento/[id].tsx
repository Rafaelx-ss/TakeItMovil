import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { backend } from '@/context/endpoints';
import { EventosService } from '@/services/events.service';
import { QrCodesService } from '@/services/qrCodes.service';
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
  const [event, setEvent] = useState<Evento | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qrCode, setQrCode] = useState('aaaa');


  useEffect(() => {
    EventosService.obtenerEvento(Number.parseInt(Array.isArray(id) ? id[0] : id))
      .then((response) => {

        let eventoData = response.data;

        if (typeof eventoData.costoEvento === "string") {
            try {
                eventoData.costoEvento = JSON.parse(eventoData.costoEvento);
            } catch (error) {
                console.error("❌ Error al parsear costoEvento:", error);
                eventoData.costoEvento = []; 
            }
        }

          setEvent(eventoData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

      if (usuarioID) {
        interface QrCodeResponse {
            data: any;
            rutaqr: string;
        }

        interface EventoResponse {
            data: Evento;
        }

        QrCodesService.obtenerQrCodePorUsuarioYEvento(Number.parseInt(Array.isArray(id) ? id[0] : id), usuarioID)
            .then((response: QrCodeResponse) => {
                setQrCode(response.data.rutaqr);
                // console.log("Respuesta QR: ", response.data.rutaqr);
            })
            .catch((error: unknown) => {
                console.error('Error al obtener el código QR:', error);
            });
      }
    }, [id, usuarioID]);

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
              <Text style={styles.infoLabel}>Costo de Inscripcióaaan</Text>
              {event?.categoriaID === 6 || event?.categoriaID === 11 ? (
              
                  event?.costoEvento?.map((entrada, index) => (
                      <Text key={index} style={styles.infoText}>
                          {entrada.nombre.charAt(0).toUpperCase() + entrada.nombre.slice(1).replace(/_/g, " ")}:  
                          ${entrada.precio} MXN
                      </Text>
                  ))
              ) : (

                  <Text style={styles.infoText}>
                      ${event?.costoEvento?.find((entrada) => entrada.nombre === "entrada_general")?.precio || "N/A"} MXN
                  </Text>
              )}
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
        <Text style={styles.sectionTitle}>Códigos QR</Text>
        {/* <Text style={{color: '#FFFFFF'}}>
            ruta: {qrCode}
        </Text> */}
        <View style={styles.qrContainer}>
            {qrCode && (
              <View style={styles.qrCodeWrapper}>
                {Platform.OS === 'web' ? (
                  backend.includes('127.0.0.1') || backend.includes('10.0.2.2') ? (
                    <Image 
                      source={{ uri: `${backend}/storage/${qrCode}` }} 
                      style={styles.qrImage} 
                    />
                  ) : (
                    <Image 
                      source={{ uri: `${backend.replace('public', 'storage/app/public')}/${qrCode}` }} 
                      style={styles.qrImage} 
                    />
                  )
                ) : (
                  backend.includes('127.0.0.1') || backend.includes('10.0.2.2') ? (
                    <SvgUri 
                      uri={`${backend}/storage/${qrCode}`}
                      width={300} 
                      height={300} 
                    />
                  ) : (
                    <SvgUri 
                      uri={`${backend.replace('public', 'storage/app/public')}/${qrCode}`}
                      width={300} 
                      height={300} 
                    />
                  )
                )}
              </View>
            )}
          </View>

      </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>{event?.telefonoEvento}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  qrCodeWrapper: {
    borderWidth: 6, // Ajusta el grosor del borde
    borderColor: 'white', // Color del borde
    borderRadius: 8, // Opcional, para esquinas redondeadas
    backgroundColor: 'white', // Fondo blanco para mejorar contraste
    padding: 10, // Espaciado para separar el QR del borde
  },
  qrImage: {
    width: 300,
    height: 300,
  },
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
});