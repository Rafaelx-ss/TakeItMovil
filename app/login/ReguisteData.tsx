import { stripBaseUrl } from "expo-router/build/fork/getStateFromPath-forks";
import { View, Text,TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from "../../context/AuthContext";// Asegúrate de la ruta correcta
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function ReguisteData() {
    const progress = 95;
    const router = useRouter();

    return(
        <SafeAreaView style = {styles.container}>

        <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: height * 0.05,
                  marginLeft: width * 0.05,
                }}
                onPress={() => {
                    router.back();
                }}>
                <Icon
                  style={{marginTop: height * 0.005}}
                  name={'chevron-left'}
                  size={20}
                  color="#FCA311"
                />
        
              </TouchableOpacity>
        
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>

                <View>
                    <Text style = {styles.titulo}>¡Ya casi terminas!</Text>
                    <Text style = {styles.subtitulo}>Solo necesitamos unos datos mas ....</Text>
                </View>
                
                <View style={styles.Text}>  
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Numero"
                            placeholderTextColor={"grey"}
                            keyboardType="numeric" 
                        />
                    </View>
            
                    <View style={styles.Text}>  
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Fecha"
                            placeholderTextColor={"grey"}
                        />
                    </View>
            
            
                    <View style={styles.Text}>  
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Genero"
                            placeholderTextColor={"grey"}
                        />
                    </View>
            
                    <View style={styles.Text}>  
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Ubicacion"
                            placeholderTextColor={"grey"}
                        />
                    </View>

                    <TouchableOpacity style={styles.buttom} onPress={() => router.push('/login')}>
                                    <Text style={styles.textButtom}>Continuar</Text>
                    </TouchableOpacity>

            
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    progressContainer: {
      height: 5, 
      backgroundColor: '#E0E0E0', 
      borderRadius: 2.5,
      overflow: 'hidden',
      width: '90%',
      alignSelf: 'center', 
      marginTop: height * 0.02,
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#D4AF37',
    },
    titulo: {
        fontSize: 30,
        color: '#fff',
        marginLeft: width * 0.05,
        marginTop: height * 0.05,
        fontWeight: 'bold',
    },
    subtitulo: {
        color: '#6E7375',
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginTop: height * 0.01,
        fontSize: 20,
    },
    Text: {
        color: '#fff',
        marginTop: height * 0.03,
        alignItems: 'center',
      },
      TextInput: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        width: '90%',
        marginTop: height * 0.01,
        color: '#fff',
        height: height * 0.05,
      },
      buttom: {
        backgroundColor: '#D4AF37',
        width: width * 0.9,
        height: height * 0.06,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height * 0.05,
        borderRadius: 10,
      },
      textButtom: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight:'500',
    },

})