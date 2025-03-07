import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { EventosService } from '@/services/events.service';
import { Evento } from '@/types/eventos';

const { width } = Dimensions.get('window');

// Mock data for a single event
const mockEvent = {
    nombreEvento: 'Carrera Mario Kart',
    fechaEvento: '2025-06-15',
    horaEvento: '10:00',
    lugarEvento: 'Autódromo Hermanos Rodríguez',
    direccionEvento: 'Av. Viaducto Río de la Piedad s/n, Granjas México',
    municioEvento: 'Iztacalco, CDMX',
    cpEvento: '08400',
    descripcionEvento: 'Participa en la carrera temática de Mario Kart más grande de México. Disfruta de un recorrido lleno de diversión con obstáculos y sorpresas inspiradas en el famoso videojuego. Habrá categorías para todas las edades y premios para los ganadores.',
    maximoParticipantesEvento: 200,
    participantesActuales: 120,
    costoEvento: 350,
    duracionEvento: '3 horas',
    kitEvento: 'Playera oficial, Gorra temática, Número de participante, Medalla conmemorativa, Kit de hidratación',
    telefonoEvento: '55 1234 5678',
    estadoEvento: 'Activo',
    imagenEvento: 'mario-kart.png'
};

export default function AdminEventDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
     const [event, setEvent] = useState<Evento | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isQrModalVisible, setQrModalVisible] = useState(false);
    const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

    const [Participantes, setParticipantes] = useState([]);
    


    useEffect(() => {
        // In a real app, you would fetch the event data here


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
            console.log('🔍 Detalles del evento:', response.data);
            setIsLoading(false);
              })
              .catch((error) => {
            console.error('Error fetching event data:', error);
            setIsLoading(false);
              });


            EventosService.Participanteseventos(Number.parseInt(Array.isArray(id) ? id[0] : id))
              .then((response) => {
             const count = response.data;

                // Mostrar el count en la consola
                console.log('🔍 Participantes:', response.data);
                console.log('🔍 Total de participantes:', count);  // Aquí accedes a `count`

                // Opcional: Guardar count en un estado separado si es necesario
                setParticipantes(response.data);

                console.log('🔍 Total de participantes:', Participantes);
                console.log(Participantes.count)  // Aquí accedes a `Participantes`
            
              })
              .catch((error) => {
            console.error('Error fetching event data:', error);
            setIsLoading(false);
              });

    



    }, [id]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-MX', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleScanQR = () => {
        router.push('/push/Admin/QRScanners/QRScanner');
    };

    const toggleQrModal = () => {
        setQrModalVisible(!isQrModalVisible);
    };

    const toggleOptionsModal = () => {
        setOptionsModalVisible(!isOptionsModalVisible);
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#E0B942" />
                <Text style={styles.loadingText}>Cargando información del evento...</Text>
            </View>
        );
    }

    const maxParticipants = event?.maximoParticipantesEvento ?? 0;
    const currentParticipants = Participantes?.count ?? 0;
    const occupancyPercentage = maxParticipants > 0 ? ((currentParticipants / maxParticipants) * 100) : 0;
    console.log('🔍 Porcentaje de ocupación:', occupancyPercentage);
    const isNearCapacity = occupancyPercentage > 80;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/images/mario-kart.png')}
                        style={styles.image}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(26, 26, 26, 0.8)', '#1A1A1A']}
                        style={styles.gradient}
                    />
                    <View style={styles.headerButtons}>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => router.back()}
                        >
                            <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={toggleOptionsModal}
                        >
                            <MaterialIcons name="more-vert" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={[
                            styles.statusBadge,
                            { backgroundColor: event?.estadoEvento === "Activo" ? '#4CAF50' : '#E0B942' }
                        ]}>
                            <Text style={styles.statusText}>{event?.activoEvento ? "Activo" : "Inactivo"}</Text>
                        </View>
                        <Text style={styles.title}>{event?.nombreEvento}</Text>
                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeItem}>
                                <MaterialIcons name="event" size={20} color="#E0B942" />
                                <Text style={styles.dateTimeText}>{formatDate(event?.fechaEvento)}</Text>
                            </View>
                            <View style={styles.dateTimeItem}>
                                <MaterialIcons name="access-time" size={20} color="#E0B942" />
                                <Text style={styles.dateTimeText}>{event?.horaEvento} hrs</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.scanQrButton}
                        onPress={handleScanQR}
                        activeOpacity={0.8}
                    >
                        <MaterialIcons name="qr-code-scanner" size={24} color="#FFFFFF" />
                        <Text style={styles.scanQrText}>Escanear QR</Text>
                    </TouchableOpacity>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{event?.maximoParticipantesEvento}</Text>
                            <Text style={styles.statLabel}>Registrados</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{Participantes?.count}</Text>
                            <Text style={styles.statLabel}>Confirmados</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{event?.maximoParticipantesEvento - Participantes?.count}</Text>
                            <Text style={styles.statLabel}>Disponibles</Text>
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
                                <TouchableOpacity style={styles.mapButton}>
                                    <Text style={styles.mapButtonText}>Ver en mapa</Text>
                                    <MaterialIcons name="open-in-new" size={16} color="#E0B942" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <FontAwesome5 name="users" size={20} color="#E0B942" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Capacidad</Text>
                                <Text style={styles.infoText}>{event.maximoParticipantesEvento} participantes</Text>
                                <View style={styles.capacityContainer}>
                                    <View style={styles.capacityBar}>
                                        <View
                                            style={[
                                                styles.capacityFill,
                                                {
                                                    width: `${occupancyPercentage}%`,
                                                    backgroundColor: isNearCapacity ? '#E74C3C' : '#E0B942'
                                                }
                                            ]}
                                        />
                                    </View>
                                    <View style={styles.capacityTextContainer}>
                                        <Text style={styles.capacityText}>
                                            {event.participantesActuales}/{event.maximoParticipantesEvento}
                                        </Text>
                                        <Text style={[styles.capacityPercentage, { color: isNearCapacity ? '#E74C3C' : '#E0B942' }]}>
                                            ({Math.round(occupancyPercentage)}%)
                                        </Text>
                                    </View>
                                </View>
                                {isNearCapacity && (
                                    <Text style={styles.capacityWarning}>
                                        ¡Evento casi lleno! Quedan pocos lugares disponibles.
                                    </Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Costo de Inscripción</Text>
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


                   

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="timer" size={24} color="#E0B942" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Duración</Text>
                                <Text style={styles.infoText}>{event.duracionEvento}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Descripción del Evento</Text>
                        <Text style={styles.description}>{event.descripcionEvento}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kit del Participante</Text>
                        <View style={styles.kitContainer}>
                            {event.kitEvento.split(',').map((item, index) => (
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
                            <MaterialIcons name="call" size={20} color="#FFFFFF" />
                            <Text style={styles.contactButtonText}>{event.telefonoEvento}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.editButton]}
                            onPress={() => router.push(`../push/Admin/forms/EditarEvento/${id}`)}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="edit" size={20} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>Editar Evento</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.participantsButton]}
                            // onPress={() => router.push(`/forms/VerParticipantes/${id}`)}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="people" size={20} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>Ver Participantes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.qrButton]}
                            onPress={toggleQrModal}
                            activeOpacity={0.8}
                        >
                            <MaterialIcons name="qr-code" size={20} color="#FFFFFF" />
                            <Text style={styles.actionButtonText}>Generar QR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* QR Code Modal */}
            <Modal
                isVisible={isQrModalVisible}
                onBackdropPress={toggleQrModal}
                backdropOpacity={0.7}
                animationIn="fadeIn"
                animationOut="fadeOut"
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Código QR del Evento</Text>
                    <View style={styles.qrContainer}>
                        <Image
                            source={require('@/images/mario-kart.png')}
                            style={styles.qrImage}
                        />
                    </View>
                    <Text style={styles.qrDescription}>
                        Este código QR puede ser utilizado para registrar participantes o compartir información del evento.
                    </Text>
                    <View style={styles.modalButtonsRow}>
                        <TouchableOpacity style={styles.modalButton} activeOpacity={0.8}>
                            <MaterialIcons name="share" size={20} color="#FFFFFF" />
                            <Text style={styles.modalButtonText}>Compartir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} activeOpacity={0.8}>
                            <MaterialIcons name="file-download" size={20} color="#FFFFFF" />
                            <Text style={styles.modalButtonText}>Descargar</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.closeModalButton}
                        onPress={toggleQrModal}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.closeModalButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Options Modal */}
            <Modal
                isVisible={isOptionsModalVisible}
                onBackdropPress={toggleOptionsModal}
                backdropOpacity={0.7}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                style={styles.optionsModal}
            >
                <View style={styles.optionsModalContent}>
                    <View style={styles.optionsModalHeader}>
                        <Text style={styles.optionsModalTitle}>Opciones del Evento</Text>
                        <View style={styles.optionsModalDivider} />
                    </View>

                    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
                        <MaterialIcons name="notifications" size={24} color="#E0B942" />
                        <Text style={styles.optionText}>Enviar Notificación</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
                        <MaterialIcons name="pause-circle-outline" size={24} color="#E0B942" />
                        <Text style={styles.optionText}>Pausar Inscripciones</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
                        <MaterialIcons name="content-copy" size={24} color="#E0B942" />
                        <Text style={styles.optionText}>Duplicar Evento</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionItem} activeOpacity={0.7}>
                        <MaterialIcons name="bar-chart" size={24} color="#E0B942" />
                        <Text style={styles.optionText}>Ver Estadísticas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.optionItem, styles.dangerOption]} activeOpacity={0.7}>
                        <MaterialIcons name="delete" size={24} color="#E74C3C" />
                        <Text style={[styles.optionText, styles.dangerText]}>Eliminar Evento</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.closeOptionsButton}
                        onPress={toggleOptionsModal}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.closeOptionsButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#FFFFFF',
        marginTop: 16,
        fontSize: 16,
    },
    imageContainer: {
        height: 280,
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
        height: 180,
    },
    headerButtons: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginTop: -60,
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#1A1A1A',
    },
    header: {
        marginBottom: 20,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 12,
    },
    statusText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
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
    scanQrButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0B942',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    scanQrText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#2A2A2A',
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#CCCCCC',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#3A3A3A',
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
        backgroundColor: 'rgba(224, 185, 66, 0.1)',
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
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    mapButtonText: {
        color: '#E0B942',
        fontSize: 14,
        marginRight: 4,
    },
    capacityContainer: {
        marginTop: 8,
    },
    capacityBar: {
        height: 8,
        backgroundColor: '#3A3A3A',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 6,
    },
    capacityFill: {
        height: '100%',
        borderRadius: 4,
    },
    capacityTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    capacityText: {
        color: '#CCCCCC',
        fontSize: 12,
    },
    capacityPercentage: {
        fontSize: 12,
        fontWeight: '600',
    },
    capacityWarning: {
        color: '#E74C3C',
        fontSize: 12,
        marginTop: 4,
        fontStyle: 'italic',
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
        fontSize: 20,
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
    actionButtonsContainer: {
        marginTop: 10,
        marginBottom: 40,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    editButton: {
        backgroundColor: '#3498DB',
    },
    participantsButton: {
        backgroundColor: '#9B59B6',
    },
    qrButton: {
        backgroundColor: '#2A2A2A',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    modal: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#2A2A2A',
        borderRadius: 16,
        padding: 24,
        width: width * 0.9,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    qrContainer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    qrImage: {
        width: 200,
        height: 200,
    },
    qrDescription: {
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 20,
    },
    modalButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3A3A3A',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        marginHorizontal: 6,
    },
    modalButtonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontWeight: '500',
    },
    closeModalButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        backgroundColor: '#E0B942',
    },
    closeModalButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    optionsModal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    optionsModalContent: {
        backgroundColor: '#2A2A2A',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 24,
    },
    optionsModalHeader: {
        marginBottom: 16,
    },
    optionsModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
        textAlign: 'center',
    },
    optionsModalDivider: {
        height: 4,
        width: 40,
        backgroundColor: '#3A3A3A',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 8,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#3A3A3A',
    },
    optionText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginLeft: 16,
    },
    dangerOption: {
        borderBottomWidth: 0,
    },
    dangerText: {
        color: '#E74C3C',
    },
    closeOptionsButton: {
        marginTop: 20,
        paddingVertical: 16,
        alignItems: 'center',
        backgroundColor: '#3A3A3A',
        borderRadius: 12,
    },
    closeOptionsButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});