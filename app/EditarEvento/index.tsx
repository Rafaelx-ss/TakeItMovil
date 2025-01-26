import React from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { EventForm } from "@/components/eventos/EventForm"
import { useNavigation, useRoute } from "@react-navigation/native"
import HeaderGradient from "@/components/HeaderGradient"
import { useQuery } from "@tanstack/react-query"
import { EventosService } from "@/services/events.service"

export default function EditarEventoScreen() {
  const navigation = useNavigation()
  const route = useRoute<{ key: string; name: string; params: { eventoID: string } }>()
  const eventoID = route.params?.eventoID

  const { data: evento, isLoading } = useQuery({
    queryKey: ["evento", eventoID],
    queryFn: () => EventosService.obtenerEvento(Number.parseInt(eventoID)),
    enabled: !!eventoID,
    staleTime: 0,
  })

  const handleSubmitSuccess = () => {
    navigation.goBack()
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HeaderGradient title="Editar Evento" showBackButton onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E0B942" />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderGradient title="Editar Evento" showBackButton onBackPress={() => navigation.goBack()} />
      <EventForm
        event={
          evento
            ? {
                ...evento,
                categoriaID: evento.categoriaID.toString(),
                subCategoriaID: evento.subCategoriaID.toString(),
                maximoParticipantesEvento: evento.maximoParticipantesEvento.toString(),
                costoEvento: evento.costoEvento.toString(),
                cpEvento: evento.cpEvento.toString(),
                estadoID: evento.estadoID.toString(),
                fechaEvento: new Date(evento.fechaEvento),
                horaEvento: evento.horaEvento ? (() => {
                  const [hours, minutes] = evento.horaEvento.split(':').map((str) => parseInt(str, 10));
                  return new Date(1970, 0, 1, hours, minutes); 
                })() : new Date(),
              }
            : undefined
        }
        onSubmitSuccess={handleSubmitSuccess}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

