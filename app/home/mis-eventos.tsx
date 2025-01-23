import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MisEventosScreen() {
  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <LinearGradient
        colors={['#0A0A0A', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-6 pb-6 px-4"
      >
        <Text className="text-3xl font-extrabold text-text mb-2">Mis Eventos</Text>
      </LinearGradient>

      {/* Contenido centrado */}
      <View className="flex-1 bg-backgroundLight justify-center items-center">
        <Text className="text-sm font-light text-dorado">
          Hola mundo
        </Text>
      </View>
    </View>
  );
}
