//@/services/events.services.ts
import axios from 'axios';
import { Evento } from '@/types/eventos';

const backend = 'http://127.0.0.1:8000';

export const EventosService = {
    geteventos: async (page: number): Promise<{ data: Evento[] }> => {
        try {
            const response = await axios.get(`${backend}/api/eventos/page?page=${page}`, {
                headers: {
                'Content-Type': 'application/json',
                
                },

            });
            console.log(response);

            return response.data;
        } catch (error) {
            console.error('Error al obtener los eventos:', error);
            throw error;
        }
    },
};
