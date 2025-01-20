import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} className="flex-1 items-center justify-center p-6">
      <View className="w-full max-w-sm">
        <Text className="text-2xl font-bold text-center text-black mb-8 ng">
          Iniciar Sesión
        </Text>
        
        <View className="space-y-4 w-full">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="w-full bg-gray-100 rounded-lg px-4 py-3"
                  style={{ height: 50 }}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">{errors.email?.message}</Text>
                )}
              </View>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View>
                <TextInput
                  className="w-full bg-gray-100 rounded-lg px-4 py-3"
                  style={{ height: 50 }}
                  placeholder="Contraseña"
                  placeholderTextColor="#666"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">{errors.password?.message}</Text>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            className="bg-black rounded-lg py-4 w-full"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center font-bold text-lg">
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}