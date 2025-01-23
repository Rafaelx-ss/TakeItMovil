//@/services/events.services.ts
import axios from 'axios';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';


export const EventosService = {
    geteventos: async (page: number): Promise<{ data: Evento[] }> => {
        try {
            const response = await axios.get(`${backend}/api/eventos/page?page=${page}`, {
                headers: {
                'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
            throw error;
        }
    },
};
