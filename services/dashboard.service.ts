import axios from 'axios';
import { backend } from '@/context/endpoints';

interface Dasboard {
    TotalEventos: number; 
    cantidadEventosTerminados: number; 
}

export const DasboardService = {
    totalparticipantes: async (usuarioID: string): Promise<Dasboard> => {
        try {
            const response = await axios.get(`${backend}/api/totalparticipantes/${usuarioID}`);
            return response.data;  
       
        } catch (error) {
            console.error('Error en el servicio:', error);
            throw new Error('Error al obtener los datos');
        }
    },

    cantidadEventosTerminados: async (usuarioID: string): Promise<Dasboard> => {
        try {
            const response = await axios.get(`${backend}/api/cantidadEventosTerminados/${usuarioID}`);
            return response.data;  
       
        } catch (error) {
            console.error('Error en el servicio:', error);
            throw new Error('Error al obtener los datos');
        }
    },

    Grafica: async (usuarioID: string): Promise<any[]> => {
        try {
            const response = await axios.get(`${backend}/api/Graficadash/${usuarioID}`);
    
            return response.data;  
       
        } catch (error) {
            console.error('Error en el servicio:', error);
            throw new Error('Error al obtener los datos');
        }
    },
}


