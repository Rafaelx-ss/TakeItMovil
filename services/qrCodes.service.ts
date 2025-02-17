import axios from 'axios';
import { backend } from '@/context/endpoints';

export const QrCodesService = {
  obtenerQrCodePorUsuarioYEvento: async (eventoID: number, usuarioID: number) => {
    try {
      const response = await axios.get(`${backend}/api/qr_codes/evento/${eventoID}/usuario/${usuarioID}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el código QR:', error);
      throw error;
    }
  },
};