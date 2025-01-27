import { stripBaseUrl } from "expo-router/build/fork/getStateFromPath-forks"
import { Platform, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useAuth } from "@/context/AuthContext" // Asegúrate de la ruta correcta

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default function index() {
  const route = useRouter()

  const index = () => {}
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image
        source={require("@/images/Container.png")}
        style={{ width: width, height: height * 0.4, alignSelf: "center" }}
      />

      <View style={styles.Text}>
        <Text style={styles.principal}>Take It !</Text>
      </View>

      <View style={styles.Text}>
        <Text style={styles.eslogan}>Disfruta tus eventos y vive al máximo</Text>
      </View>

      <TouchableOpacity style={styles.buttom} onPress={() => route.push("/login/ReguistreGenerar")}>
        <Text style={styles.textButtom}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={{ marginHorizontal: 20, color: "#fff" }}>O regístrate con</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("@/images/google.png")} style={styles.googleIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
          <Image source={require("@/images/facebook.png")} style={styles.facebookIcon} />
        </TouchableOpacity>

        {Platform.OS === "ios" && (
          <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
            <Image source={require("@/images/apple.png")} style={[styles.appleIcon, { tintColor: "white" }]} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.Text}>
        <Text style={styles.textContainer}>
          ¿Ya tienes cuenta?
          <TouchableOpacity style={{marginTop: 9}} onPress={() => route.push('/login/LoginScreen')}>
            <Text style={styles.inicio}>Inicia sesión</Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.textContainerfooter}>
          Al registrarse usted acepta nuestra{"\n"}
          <Text style={styles.textContainertaik}>Condiciones de uso</Text>
          <Text style={styles.textContainerfooter}> y </Text>
          <Text style={styles.textContainertaik}>política de privacidad</Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  principal: {
    color: "#D4AF37",
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  socialButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
    justifyContent: "center",
    alignItems: "center",
  },
  appleButton: {
    backgroundColor: "black",
  },
  googleIcon: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  facebookIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  appleIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "white",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    justifyContent: "center",
  },
  line: {
    width: 80,
    height: 1,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
  eslogan: {
    color: "#fff",
    fontSize: 24,
    width: "90%",
    textAlign: "center",
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    marginTop: height * 0.05,
  },
  Text: {
    color: "#fff",
    marginTop: height * 0.02,
    alignItems: "center",
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "#D2D1CE",
    borderRadius: 5,
    width: "90%",
    marginTop: height * 0.01,
    color: "#fff",
    height: height * 0.05,
  },
  textContainer: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerContainer: {
    position: "absolute",
    bottom: height * 0.05,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  textContainerfooter: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  textContainertaik: {
    fontSize: 12,
    color: "#D4AF37",
    fontWeight: "bold",
    textAlign: "center",
  },
  inicio: {
    color: "#D4AF37",
    fontWeight: "bold",
    marginLeft: width * 0.02,
    lineHeight: 21,
  },
  buttom: {
    backgroundColor: "#D4AF37",
    width: width * 0.6,
    height: height * 0.06,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: height * 0.05,
    borderRadius: 5,
  },
  textButtom: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    fontSize: 19,
  },
})

