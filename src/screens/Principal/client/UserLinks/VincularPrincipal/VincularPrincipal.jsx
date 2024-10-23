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

import { db } from "../../../../../db/conection";
import {
  getAuth,
  signOut,
  linkWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  updateProfile,
  updateEmail,
  FacebookAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
const { width, height } = Dimensions.get("window");
import CustomAwesome from "../../../../../components/AwesomeAlert";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import * as WebBrowser from "expo-web-browser";
import InstructionsModal from "../../../../../components/ModalInstructions";
WebBrowser.maybeCompleteAuthSession();
import AwesomeAlert from "react-native-awesome-alerts";
export default function VincularPrincipal() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    clientId:
      "857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com",
    iosClientId:
      "857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com",
    androidClientId:
      "857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com",
  });

  const [user, setUser] = useState(null);
  const [errorSign, setErrorSign] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const { accessToken } = authentication;

      fetchUserInfo(accessToken);

      const credentials = GoogleAuthProvider.credential(
        response.params.id_token
      );
      linkUserWithGoogle(credentials);
    }
  }, [response]);

  async function fetchUserInfo(accessToken) {
    console.log("Fetching user info...");
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = await res.json();
    setUser(userInfo);
    console.log("User: ", userInfo);
    // Aquí puedes agregar el registro con Google si es necesario
    // registerWithGoogle(userInfo);
  }

  async function linkUserWithGoogle(credentials) {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is currently logged in.");
      showCustomAlert(
        "Error",
        "No hay ningún usuario autenticado actualmente."
      );
      return;
    }

    try {
      // Vincula la cuenta actual con la cuenta de Google
      const linkedUser = await linkWithCredential(user, credentials);
      console.log("User successfully linked:", linkedUser);

      const googleUser = linkedUser.user;

      // Actualiza el correo del usuario actual al correo de Google
      if (user.email !== googleUser.email) {
        await updateEmail(user, googleUser.email);
        console.log("Email updated to Google email:", googleUser.email);
      }

      // Actualiza la foto de perfil
      await updateProfile(user, {
        photoURL: googleUser.photoURL,
        verifyByGoogle: true,
      });
      console.log(
        "Profile photo updated to Google profile picture:",
        user.photoURL
      );

      showCustomAlert("Éxito", "Tu cuenta ha sido vinculada exitosamente.");
    } catch (error) {
      if (error.code === "auth/credential-already-in-use") {
        console.log("La cuenta de Google ya está en uso.");
        showCustomAlert(
          "Error",
          "Ya existe una cuenta vinculada con ese correo de Google."
        );

        // Lógica adicional para cuentas existentes
      } else if (error.code === "auth/provider-already-linked") {
        console.error("Error linking accounts:", error);
        //alert("Error, esta cuenta ya esta vinculada. ");
        showCustomAlert(
          "Error",
          "Este proveedor ya está vinculado con tu cuenta."
        );
      } else {
        showCustomAlert("Error", "Ocurrió un error inesperado.");
      }
    }
  }

  function showCustomAlert(title, message) {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  }
  async function onFacebookButtonPress() {
    setIsLoading(true);
    try {
      // Intentar iniciar sesión con los permisos solicitados
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw new Error("El usuario canceló el proceso de inicio de sesión");
      }

      // Obtener el AccessToken del usuario
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error("Hubo un error obteniendo el token de acceso");
      }

      // Crear una credencial de Firebase con el AccessToken de Facebook
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );

      // Obtener el usuario actual de Firebase
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No hay ningún usuario autenticado actualmente");
      }

      try {
        // Intentar vincular la cuenta de Facebook con la cuenta actual de Firebase
        const linkedUser = await linkWithCredential(user, facebookCredential);
        console.log("Cuenta de Facebook vinculada con éxito:", linkedUser);

        // ... (actualizar correo, foto de perfil, etc.)

        showCustomAlert("Éxito", "Tu cuenta ha sido vinculada exitosamente.");
        navigation.navigate("Principal");
      } catch (error) {
        if (error.code === "auth/requires-recent-login") {
          console.log("Re-autenticación requerida, volviendo a autenticar...");

          // Re-autenticar al usuario con Facebook
          try {
            const reauthUser = await reauthenticateWithCredential(
              user,
              facebookCredential
            );
            console.log("Re-autenticación exitosa:", reauthUser);

            // Intentar vincular nuevamente la cuenta de Facebook
            const linkedUser = await linkWithCredential(
              user,
              facebookCredential
            );
            console.log(
              "Cuenta de Facebook vinculada después de re-autenticación:",
              linkedUser
            );

            // ... (actualizar correo, foto de perfil, etc.)

            showCustomAlert(
              "Éxito",
              "Tu cuenta ha sido vinculada exitosamente."
            );
            navigation.navigate("Principal");
          } catch (reauthError) {
            console.error("Error en la re-autenticación:", reauthError);
            showCustomAlert("Error", "No se pudo re-autenticar al usuario.");
          }
        } else if (error.code === "auth/credential-already-in-use") {
          // Manejo de la cuenta ya vinculada
          console.log("La cuenta de Facebook ya está en uso.");
          showCustomAlert("Error", "La cuenta de Facebook ya está en uso.");
        } else if (error.code === "auth/provider-already-linked") {
          console.error("El proveedor ya está vinculado con tu cuenta.");
          showCustomAlert(
            "Error",
            "Este proveedor ya está vinculado con tu cuenta."
          );
        } else {
          console.error("Error inesperado:", error);
          showCustomAlert(
            "Error",
            "Ocurrió un error inesperado. Si el problema persiste, contacta con los desarrolladores."
          );
        }
      }
    } catch (error) {
      console.log("Error en el inicio de sesión con Facebook:", error);
      showCustomAlert(
        "Error",
        "Ocurrió un error durante el inicio de sesión con Facebook."
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (loading) {
    return (
      <View>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          title="Cargando..."
          message="Espere por favor"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
        />
      </View>
    );
  }
  return (
    <>
      <View style={styles.buttonFloat}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle"
            size={30}
            color="black"
            style={styles.Icon}
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", marginHorizontal: 10 }}
          >
            Seguridad
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        {showAlert && (
          <CustomAwesome
            title={alertTitle}
            message={alertMessage}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
        )}
        <View>
          <View style={{ alignItems: "flex-start", marginTop: "30%" }}>
            {/*<Text>Llaves de acceso</Text>
             <TouchableOpacity onPress={() => navigation.navigate("VincularSecundaria")}>
              <Text style={{ color: "#6BB8FF" }}>
                Configuracion de llave de acceso
              </Text>
            </TouchableOpacity> */}
            <View style={{ marginVertical: 15 }}>
              <Text>
                Las llaves de acceso, o llaves de seguridad son una forma muy
                sencilla y muy segura de iniciar sesion.
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 22, margin: 10 }}>
              Otras opciones de acceso
            </Text>
          </View>
        </View>
        <View style={styles.viewButtons}>
          {modalVisible && (
            <InstructionsModal
              modalVisible={modalVisible}
              openModal={openModal}
              closeModal={closeModal}
            />
          )}
          <View style={styles.viewInfo}>
            <View style={styles.contView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => promptAsync()}
              >
                <AntDesign
                  name="google"
                  size={24}
                  color="black"
                  style={styles.Icon}
                />
                <Text style={styles.buttonText}>Google</Text>
                <Text style={{ color: "#6BB8FF" }}>Vincular</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  showCustomAlert(
                    "Espera",
                    "Estamos desarrollando esta funcion."
                  )
                }
              >
                <AntDesign
                  name="apple1"
                  size={24}
                  color="black"
                  style={styles.Icon}
                />
                <Text style={styles.buttonText}>Apple</Text>
                <Text style={{ color: "#6BB8FF" }}>Vincular</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onFacebookButtonPress()}
              >
                <FontAwesome6
                  name="facebook"
                  size={24}
                  color="black"
                  style={styles.Icon}
                />
                <Text style={styles.buttonText}>Facebook</Text>
                <Text style={{ color: "#6BB8FF" }}>Vincular</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text>
            Vincular una cuenta de redes sociales te permitira iniciar sesion
            sin el telefono. No usaremos nada sin tu consentimiento
          </Text>
          <TouchableOpacity onPress={openModal}>
            <Text style={{ color: "#6BB8FF" }}>
              Presiona para ver mas informacion sobre las vinculaciones de
              cuentas
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: -200,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: "#202020",
    marginBottom: 10,
    width: "100%",
    minWidth: "90%",
  },
  contView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  viewInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewButtons: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
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
