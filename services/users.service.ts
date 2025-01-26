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
};
