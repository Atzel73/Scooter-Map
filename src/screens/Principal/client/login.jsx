import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomInput from "../../../components/TextInput/textInput";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import pickImage from "../../../functions/cameraPicker/imagePicker";
import styles from "../StylesLoginRegister/styles";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
import { db } from "../../../db/conection";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AwesomeAlert from "react-native-awesome-alerts";

const { width, height } = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [credential, setCredential] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    clientId:
      "857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com",
    iosClientId:
      "857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com",
    androidClientId:
      "857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
      const credentials = GoogleAuthProvider.credential(
        response.params.id_token
      );
      setCredential(credentials);
    }
  }, [response, accessToken]);
  async function fetchUserInfo() {
    console.log("fetchUserInfo");
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    setUser(userInfo);
    console.log("User: ", userInfo);
    registerWithGoogle(userInfo);
  }
  const registerWithGoogle = async (user) => {
    await signInWithCredential(auth, credential)
      .then(() => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef).then((document) => {
          if (!document.exists()) {
            setDoc(doc(db, "users", auth.currentUser.uid), {
              name: user.given_name,
              last_name: user.family_name,
              rol: "usuario",
              photo: user.picture,
              password: user.given_name,
              scooter_id: "",
              status: "Activo",
              email: user.email,
              created_at: new Date(),
              users_blocked: [],
              blocked_by: [],
            });
          }
        });
      })
      .then(() => {
        //Alert.alert("¡Bienvenido!");
        setIsSuccess(true);
        navigation.navigate("Principal");
        console.log("Registrado");
        setIsSuccess(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlerNavigation = () => navigation.goBack();

  if (success) {
    return (
      <View>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          title="Cargando"
          message="Por favor espere..."
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          progressColor="#6BB8FF"
          progressSize="large"
          //cancelText="No, cancel"
          //confirmText="Yes, delete it"
          //confirmButtonColor="#DD6B55"
          //onCancelPressed={handleAlert}
          //onConfirmPressed={handleAlert}
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
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.formContainer, { marginTop: width / height - 350 }]}
      >
        <View style={{ margin: "10%" }}>
          <View style={styles.contView}>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginVertical: 10,
                marginRight: "70%",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, textAlign: "left" }}
              >
                Ingresar
              </Text>
            </View>
            <View style={styles.passwordContainer}>
              <CustomInput
                placeholder="Correo electronico"
                value={userData.email}
                onChangeText={(text) =>
                  setUserData({ ...userData, email: text })
                }
                keyboardType="email-address"
                style={{
                  width: "100%",
                  height: 50,
                  //paddingHorizontal: "45%",
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
          <View style={styles.contView}>
            <View style={styles.passwordContainer}>
              <CustomInput
                placeholder="contraseña"
                value={userData.password}
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
                secureTextEntry={!showPassword}
                style={{
                  width: "100%",
                  //paddingHorizontal: "45%",
                  marginHorizontal: 10,
                }}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconContainer}
              >
                <FontAwesome5
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.dividerMain} />
        <View style={styles.viewLogins}>
          <Funcionalidades
            style={styles.buttonSend}
            callFunction="SignUser"
            userSign={userData}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </Funcionalidades>
          <Funcionalidades
            style={styles.buttonRegister}
            onPress={handlerNavigation}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </Funcionalidades>
        </View>
        <View style={styles.Divider} />
        <View style={styles.viewPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cambiar Contraseña")}
          >
            <Text style={styles.passButton}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.viewBottom} />
    </>
  );
}
