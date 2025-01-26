import React from 'react'
import { View, StyleSheet } from 'react-native'
import { EventForm } from '@/components/eventos/EventForm'
import { useNavigation } from '@react-navigation/native'
import HeaderGradient from '@/components/HeaderGradient'

export default function CrearEventoScreen() {
  const navigation = useNavigation()

  const handleSubmitSuccess = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <HeaderGradient title="Crear Evento" showBackButton onBackPress={() => navigation.goBack()} />
      <EventForm onSubmitSuccess={handleSubmitSuccess} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})
