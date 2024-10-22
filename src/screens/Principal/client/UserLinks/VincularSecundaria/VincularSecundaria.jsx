import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TouchID from "react-native-touch-id";
import CustomAwesome from "../../../../../components/AwesomeAlert";
export default function VincularSecundaria() {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const optionalConfigObject = {
    title: "Se requiere verificacion", // Android
    imageColor: "#6BB8FF", // Android
    imageErrorColor: "#ff0000", // Android
    sensorDescription: "Huella biometrica", // Android
    sensorErrorDescription: "Error", // Android
    cancelText: "Cancelar", // Android
    fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const HandlerBiometric = async () => {
    console.log("Dentro de la huella", TouchID);
    try {
      const biometryType = await TouchID.isSupported(optionalConfigObject);
      if (biometryType === "FaceID") {
        console.log("FaceID is supported.");
        showCustomAlert("Listo", "Mensaje de prueba");
      } else {
        console.log("TouchID is supported.");
        TouchID.authenticate("", optionalConfigObject).then(
          (success) => {
            console.log("Autenticación exitosa:", success);
            showCustomAlert("Listo", "Mensaje de prueba");
            //setButtonDisabled(true)
          },
          (error) => {
            console.log("Error al autenticar:", error);
            showCustomAlert("Error", "Por favor, intentalo de nuevo");
          }
        );
      }
    } catch (error) {
      console.log("Error al verificar la compatibilidad de biometría:", error);
    }
  };
  function showCustomAlert(title, message) {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  }
  return (
    <>
      <View style={styles.containerTop}>
        <View style={styles.buttonFloat}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={require("../../../../../../assets/Icons/Group.png")}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Iniciar sesion con tu huella digital, cara o PIN de tu celular
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text>
              Las llaves de acceso utilizan el mismo metodo que usa para
              desbloquear el telefono
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.containerBottom}>
        {showAlert && (
          <CustomAwesome
            title={alertTitle}
            message={alertMessage}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
        )}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <View>
            <TouchableOpacity
              style={[styles.viewText, { marginRight: "10%" }]}
              onPress={() => HandlerBiometric()}
            >
              <Ionicons
                name="finger-print"
                size={29}
                color="black"
                style={[styles.Icon, { marginRight: 5 }]}
              />
              <Text style={{ marginHorizontal: 5 }}>
                Iniciar sesion con biometria
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewText}>
            <MaterialIcons
              name="verified-user"
              size={29}
              color="black"
              style={[styles.Icon, { marginRight: -5 }]}
            />
            <Text style={{ marginHorizontal: 7 }}>
              Se sincroniza en tus dispositivos
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewText: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  containerBottom: {
    marginTop: 20,
    paddingBottom: "40%",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTop: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFloat: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    marginBottom: 15,
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
