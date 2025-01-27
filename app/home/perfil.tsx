import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { UsersService } from '@/services/users.service';
import { User } from '@/types/users';
import { useRouter } from 'expo-router';
import HeaderGradient from '@/components/HeaderGradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';


export default function PerfilScreen() {
  const route = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await UsersService.getusers(page);

      const fetchedUsers = response?.data || []; 

      if (fetchedUsers.length === 0) {
        setHasMore(false); 
      } else {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    const deleteUsuario = async (usuarioID: number) => {
      try {
        await UsersService.deleteUser(usuarioID);
        setUsers((prevUsers) => prevUsers.filter((user) => user.usuarioID !== usuarioID));
        Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado con éxito.');
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        Alert.alert('Error', 'No se pudo eliminar el usuario.');
      }
    };
  

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <HeaderGradient
        title="Usuarios"
        rightButtonText="Crear"
        rightButtonIcon="add"
        onRightButtonPress={() => route.push("/CrearUsuario")}
      />

      {/* Lista de eventos */}
      <FlatList
        data={users}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-backgroundLight p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-text">{item.nombreUsuario} - ID: {item.usuarioID}</Text>
            <View className="flex-row justify-end absolute right-5 top-5 space-x-2">
              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 5 }}
                onPress={() => route.push(`/EditarUsuario?usuarioID=${item.usuarioID}`)}
              >
                <MaterialIcons name="edit" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: '#E0B942', padding: 10, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                onPress={() => deleteUsuario(item.usuarioID || 0)}
              >
                <MaterialIcons name="delete" size={18} color="#FFFFFF" />
              </TouchableOpacity>
          </View>
            <Text className="text-sm font-light text-dorado mt-2">
              📧 {item.email}
            </Text>
            <Text className="text-sm font-bold text-dorado text-right mt-2">
              🔒 {item.rolUsuario}
            </Text>
          </View>
        )}
        // keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListEmptyComponent={() => (
          <View className="mt-10">
            <Text className="text-center text-gray-500">
              No hay usuarios disponibles
            </Text>
          </View>
        )}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
}
