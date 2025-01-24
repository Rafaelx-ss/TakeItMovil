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

  // Eliminar un evento por ID
  deleteEvento: async (eventoID: number): Promise<void> => {
    try {
      await axios.delete(`${backend}/api/eventos/${eventoID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      throw error;
    }
  },

  // Actualizar un evento por ID
  updateEvento: async (eventoID: number, evento: Partial<Evento>): Promise<{ data: Evento }> => {
    try {
      const response = await axios.put(`${backend}/api/eventos/${eventoID}`, evento, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw error;
    }
  },

  // Crear un nuevo evento
  createEvento: async (evento: Partial<Evento>): Promise<{ data: Evento }> => {
    try {
      const response = await axios.post(`${backend}/api/eventos`, evento, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw error;
    }
  },
};
