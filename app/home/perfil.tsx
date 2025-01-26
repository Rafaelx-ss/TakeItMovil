import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { UsersService } from '@/services/users.service';
import { User } from '@/types/users';
import { useRouter } from 'expo-router';
import HeaderGradient from '@/components/HeaderGradient';


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

  return (
    <View className="flex-1 bg-background">
      {/* Encabezado */}
      <HeaderGradient
        title="Usuarios"
        rightButtonText="Crear"
        rightButtonIcon="add"
        onRightButtonPress={() => route.push("/CrearEvento")}
      />


      {/* Lista de eventos */}
      <FlatList
        data={users}
        className="px-4 mt-4"
        renderItem={({ item }) => (
          <View className="bg-backgroundLight p-5 rounded-lg mb-4 shadow-md">
            <Text className="text-xl font-bold text-text">{item.nombreUsuario} - ID: {item.usuarioID}</Text>
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
