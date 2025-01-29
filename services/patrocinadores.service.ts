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
          await axios.delete(`${backend}/api/patrocinadores/delete/${patrocinadorID}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('Error al eliminar el evento:', error);
          throw error;
        }
      },

    createPatrocinador: async (nombrePatrocinador: string,representantePatrocinador: string, rfcPatrocinador: string, correoPatrocinador: string, telefonoPatrocinador: string, numeroRepresentantePatrocinador: string): Promise<void> => {
        try {
            await axios.post(`${backend}/api/patrocinadores/post`, 
                { 
                    usuarioID:1,
                    nombrePatrocinador: nombrePatrocinador,
                    representantePatrocinador: representantePatrocinador,
                    rfcPatrocinador: rfcPatrocinador,
                    correoPatrocinador: correoPatrocinador,
                    telefonoPatrocinador: telefonoPatrocinador,
                    numeroRepresentantePatrocinador: numeroRepresentantePatrocinador
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                } 
            );
        }catch (error){
            console.error('Error al crear patrocinador:', error);
            throw error;
        }
    },

    editarPatrocinador: async (nombrePatrocinador: string,representantePatrocinador: string, rfcPatrocinador: string, correoPatrocinador: string, telefonoPatrocinador: string, numeroRepresentantePatrocinador: string, patrocinadorID: number): Promise<void> => {
        try {
            await axios.put(`${backend}/api/patrocinadores/put/${patrocinadorID}`, 
                { 
                    nombrePatrocinador: nombrePatrocinador,
                    representantePatrocinador: representantePatrocinador,
                    rfcPatrocinador: rfcPatrocinador,
                    correoPatrocinador: correoPatrocinador,
                    telefonoPatrocinador: telefonoPatrocinador,
                    numeroRepresentantePatrocinador: numeroRepresentantePatrocinador
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

    getPatrocinador: async (id: number): Promise<any> => {
        try {
            const response = await axios.get(`${backend}/api/patrocinadores/get/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener patrocinador:', error);
            throw error;
        }
    },
};
