import { Platform } from 'react-native';

// backendlocal
export const backend =
    Platform.OS === 'web'
        ? "http://127.0.0.1:8000"
        : "http://10.0.2.2:8000";



// backend de produccion
// export const backend = "https://cody.mx/sopmex/Takeitapis/public"; 