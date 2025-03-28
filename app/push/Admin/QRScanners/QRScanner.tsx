import { Camera, useCameraPermissions, CameraView } from 'expo-camera';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import axios from "axios";
import { backend } from '@/context/endpoints';

type Prop = {
  type: string;
  data: string;
};

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        alert('Lo siento, necesitamos permiso de la cámara para que esto funcione.');
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }: Prop) => {
    try {
      setScanned(true);
  
      
      const qrData = JSON.parse(data);
      const { usuarioID, eventoID } = qrData;
  
    
      const response = await axios.put(`${backend}/api/qr_codes/${usuarioID}/${eventoID}/finalizar`);
  
   
      const result = response.data;
  

      Alert.alert(
        `Código ${type} Escaneado`,
        result.success ? `✅ ${result.message}` : `❌ ${result.message}`,
        [{ text: 'OK', onPress: () => setScanned(false) }],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error); 
  
      Alert.alert(
        'Error',
        'Hubo un problema al procesar el QR',
        [{ text: 'OK', onPress: () => setScanned(false) }],
        { cancelable: false }
      );
    }
  };

  if (!permission?.granted) {
    // Camera permissions are still loading or denied.
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Permiso de la cámara no concedido.</Text>
        <Button title="Solicitar Permiso" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
      <View style={styles.layerContainer}>
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </View>
    </CameraView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  layerContainer: {
    flex: 1,
  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerCenter: {
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  focused: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});