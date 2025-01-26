import { stripBaseUrl } from "expo-router/build/fork/getStateFromPath-forks";
import { View, Text,TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from "../../context/AuthContext";// Asegúrate de la ruta correcta
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function index() {
  const route = useRouter();

  const index = () => {
    
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
    <Image
        source={require('../../image/Container.png')}
      style={{width: width, height: height * 0.40, alignSelf: 'center'}}
      />

      <View style={styles.Text}>
        <Text style={styles.principal}>Take It !</Text>
      </View>

      <View style={styles.Text}>
      <Text style={styles.eslogan}>Disfruta tus eventos y vive al máximo</Text>
      </View>

      <TouchableOpacity style={styles.buttom} onPress={() =>route.push('/login/ReguistreGenerar')} >
        <Text style={styles.textButtom}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.container}>
      <View style={styles.line} />
         <Text style={ {marginHorizontal: 20, color : '#fff'}}>O regístrate con</Text>
      <View style={styles.line} />
    </View>

    <View style={styles.icon}>
    
    <TouchableOpacity style={styles.icon} >
    <Icon name="google" size={40} color="#DB4437" style={{margin: 10}} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon} >
    <Icon name="facebook" size={40} color="#3b5998"  style={{margin: 10}} />
    </TouchableOpacity>
    </View>

    <View style={styles.Text} >
        <Text style ={styles.textContainer}>¿Ya tienes cuenta? 
          <TouchableOpacity style={{marginTop: height* 0.01}} onPress={() => route.push('/login/LoginScreen')}>
        <Text style = {styles.inicio}>Inicia sesión</Text>
      </TouchableOpacity>
      </Text>
    
    </View>


    <View  style={styles.Text} >
    <Text style ={styles.textContainer}>Al registrarse usted acepta nuestra </Text>
    <Text style = {styles.textContainertaik}>Condiciones de uso <Text style ={styles.textContainer}>y</Text> <Text></Text>política de privacidad</Text>
    </View>
    
     
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  principal: {
    color: '#D4AF37',
    alignSelf: 'center',
  
    fontSize: 30,
    fontWeight: 'bold',
  },

  icon:{
    flexDirection: 'row', 
    justifyContent: 'center',
  },

  container: {
    flexDirection: 'row', 
 
    alignItems: 'center', 
    marginVertical: 20, 
    justifyContent: 'center'
    
  },

  line: {
    
    width: 80,
    height: 1, 
    backgroundColor: '#ccc', 
    alignSelf: 'center',
  },
 

  eslogan: {
    color: '#fff',
    fontSize: 25,
    width: '90%',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
  Text: {
    color: '#fff',
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  TextInput: {
    borderWidth: 1,
    borderColor: '#D2D1CE',
    borderRadius: 5,
    width: '90%',
    marginTop: height * 0.01,
    color: '#fff',
    height: height * 0.05,
  },
  textContainer: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textContainertaik: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },
  inicio: {
   
    color: '#D4AF37',
    fontWeight: 'bold',
     marginLeft: width * 0.02,
  
  },
  buttom: {
    backgroundColor: '#D4AF37',
    width: width * 0.6,
    height: height * 0.06,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: height * 0.05,
    borderRadius: 5,
  },
  textButtom: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight:'500',
    fontSize: 19,
  },
});