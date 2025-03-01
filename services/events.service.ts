import axios from 'axios';
import { Evento } from '@/types/eventos';
import { backend } from '@/context/endpoints';
import { format } from "date-fns"
import { Alert } from 'react-native';


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

    eventosstarting: async (): Promise<{ data: Evento[] }> => {
        try {
            const response = await axios.get(`${backend}/api/eventos/eventosstarting`, {
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
            const response = await axios.get(`${backend}/api/eventos/get/${eventoID}`, {
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

    crearEvento: async (usuarioID: number, eventoData: Omit<Evento, "eventoID">): Promise<Evento> => {
    try {
        const formattedData = {
            ...eventoData,
            horaEvento: format(new Date(eventoData.horaEvento), "HH:mm"),
            fechaEvento: format(new Date(eventoData.fechaEvento), "yyyy-MM-dd"),
            categoriaID: Number(eventoData.categoriaID),
            subCategoriaID: Number(eventoData.subCategoriaID),
            estadoID: Number(eventoData.estadoID),
            maximoParticipantesEvento: Number(eventoData.maximoParticipantesEvento),
            duracionEvento: Number(eventoData.duracionEvento),
            costoEvento: Number(eventoData.costoEvento),
            tipo_creador: eventoData.tipo_creador, 
            imagen_evento: eventoData.imagen_evento,
        }

        const response = await axios.post(`${backend}/api/eventos/crear/${usuarioID}`, formattedData, {
        headers: {
            "Content-Type": "application/json",
        },
        })
        return response.data
    } catch (error) {
        console.error("Error al crear el evento:", error)
        throw error
    }
    },

    actualizarEvento: async (eventoID: number, eventoData: Partial<Evento>): Promise<Evento> => {
    try {
        const formattedData = {
            ...eventoData,
            horaEvento: format(new Date(eventoData.horaEvento || ""), "HH:mm"),
            fechaEvento: format(new Date(eventoData.fechaEvento || ""), "yyyy-MM-dd"),
            categoriaID: Number(eventoData.categoriaID),
            subCategoriaID: Number(eventoData.subCategoriaID),
            estadoID: Number(eventoData.estadoID),
            maximoParticipantesEvento: Number(eventoData.maximoParticipantesEvento),
            duracionEvento: Number(eventoData.duracionEvento),
            costoEvento: Number(eventoData.costoEvento),
        }

        const response = await axios.put(`${backend}/api/eventos/actualizar/${eventoID}`, formattedData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    } catch (error) {
        console.error("Error al actualizar el evento:", error)
        throw error
    }
    },

    eliminarEvento: async (eventoID: number): Promise<void> => {
        try {
            await axios.delete(`${backend}/api/eventos/delete/${eventoID}`, {
                headers: {
                'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            throw error;
        }
    },

    obtenerEventosUsuario: async (usuarioID: number): Promise<{ data: Evento[] }> => {
        try {
            const response = await axios.get(`${backend}/api/eventos/usuario/${usuarioID}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener los eventos del usuario:', error);
            throw error;
        }
    },

    obtenerEventosAdmin: async (usuarioID: number, page = 1, limit = 10): Promise<Evento[]> => {

       
        try {
            const response = await axios.get(`${backend}/api/eventos/admin/${usuarioID}`, {
                params: { page, limit }
            });
    
            console.log("Respuesta completa de la API:", response.data);
    
            // Acceder correctamente a los eventos
            const eventos = response.data.data ?? []; 
    
            if (!Array.isArray(eventos)) {
                console.warn("La API no devolvió un array en 'data':", eventos);
                return [];
            }
    
            return eventos;
        } catch (error) {
            console.log(`${backend}/api/eventos/admin/${usuarioID}`);
            console.error('Error al obtener los eventos del administrador:', error);
            return [];
        }
    },
    
    
    

    inscribirUsuario: async (eventoID: number, usuarioID: number): Promise<any> => {
        try {
            const response = await axios.post(`${backend}/api/eventos/inscribirUsuario`, {
                eventoID: eventoID,
                usuarioID: usuarioID
            });
            return response.data;
        } catch (error: any) {
            // {
            // "success": false,
            // "message": "Prueba de error",
            // "errors": []
            // }
            // Alert.alert('Error al inscribirse al evento:', error.response.data.message);
            throw error;
        }


    }
};
