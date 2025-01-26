import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderGradient from '@/components/HeaderGradient';
import { useRouter } from 'expo-router';



export default function MisEventosScreen() {
  const route = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <HeaderGradient
        title="Mis Eventos"
        rightButtonText="Crear"
        rightButtonIcon="add"
        onRightButtonPress={() => route.push("/CrearEvento")}
      />

      {/* Contenido centrado */}
      <View className="flex-1 bg-backgroundLight justify-center items-center">
        <Text className="text-sm font-light text-dorado">
          Hola mundo
        </Text>
      </View>
    </View>
  );
}
