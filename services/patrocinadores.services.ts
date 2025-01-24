//@/services/events.services.ts
import axios from 'axios';
import { Patrocinador } from '@/types/patrocinadores';
import { backend } from '@/context/endpoints';


export const PatrocinadoresService = {
    getpatrocinadores: async (page: number): Promise<{ data: Patrocinador[] }> => {
        try {
            const response = await axios.get(`${backend}/api/patrocinadores/page?page=${page}`, {
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
    deletePatrocinador: async (patrocinadorID: number): Promise<void> => {
        try {
          await axios.delete(`${backend}/api/patrocinadores/${patrocinadorID}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error al eliminar el evento:', error);
          throw error;
        }
      },
};
