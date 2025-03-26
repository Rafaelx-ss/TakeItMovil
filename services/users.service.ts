//@/services/events.services.ts
import axios from 'axios';
import { User } from '@/types/users';
import { backend } from '@/context/endpoints';


export const UsersService = {
    getusers: async (page: number): Promise<{ data: User[] }> => {
        try {
            const response = await axios.get(`${backend}/api/users/page?page=${page}`, {
                headers: {
                'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    },
    crearUser: async (nombreUsuario: string, usuario: string, email: string, password: string, telefonoUsuario: string, generoUsuario: string, rolUsuario: string): Promise<void> => {
        try {
            await axios.post(`${backend}/api/auth/register`, 
                {
                    nombreUsuario: nombreUsuario,
                    usuario: usuario,
                    email: email,
                    password: password,
                    telefonoUsuario: telefonoUsuario,
                    generoUsuario: generoUsuario,
                    rolUsuario: rolUsuario
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } 
            );
        }catch (error){
            console.error('Error al crear usuario:', error);
            throw error;
        }
    },

    editarUsuario: async (usuarioID: number, key: string, valor: string): Promise<void> => {
        try {
            await axios.post(`${backend}/api/users/update/${usuarioID}`, 
                { 
                    key: key,
                    valor: valor,
     
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } 
            );
        }catch (error){
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }, 

    editarUsuarioEmail: async ( key: string, valor: string): Promise<void> => {
        try {
            await axios.post(`${backend}/api/auth/newpassword`, {
                correo : key,
                password : valor,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } 
            );
        }catch (error){
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }, 

    getUsuario: async (usuarioID: number): Promise<User> => {
        try {
            const response = await axios.get(`${backend}/api/users/get/${usuarioID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    },
    
    deleteUser: async (usuarioID: number): Promise<User> => {
        try {
            const response = await axios.delete(`${backend}/api/users/delete/${usuarioID}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw error;
        }
    }
};
