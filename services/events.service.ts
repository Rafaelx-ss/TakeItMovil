import axios from 'axios';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';

export const EventosService = {
    getEventos: async (page: number): Promise<{ data: Evento[] }> => {
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

    obtenerEvento: async (eventoID: number): Promise<Evento> => {
        try {
            const response = await axios.get(`${backend}/api/eventos1/${eventoID}`, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener el evento:', error);
            throw error;
        }
    },

    crearEvento: async (usuarioID: number, eventoData: Omit<Evento, 'eventoID'>): Promise<Evento> => {
        try {
            const response = await axios.post(`${backend}/api/eventos/crear/${usuarioID}`, eventoData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el evento:', error);
            throw error;
        }
    },

    actualizarEvento: async (eventoID: number, eventoData: Partial<Evento>): Promise<Evento> => {
        try {
            const response = await axios.put(`${backend}/api/eventos3/${eventoID}`, eventoData, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            throw error;
        }
    },

    eliminarEvento: async (eventoID: number): Promise<void> => {
        try {
            await axios.delete(`${backend}/api/eventos4/${eventoID}`, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            throw error;
        }
    }
};
