import { Platform } from 'react-native';

export const backend =
    Platform.OS === 'web'
        ? "http://127.0.0.1:8000" // URL para web
        : "http://10.0.2.2:8000"; // URL para móvil
