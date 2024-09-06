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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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

const { width, height } = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [credential, setCredential] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
        Alert.alert("¡Bienvenido!");
        navigation.navigate("Principal");
        console.log("Registrado");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.formContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contView}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <CustomInput
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            keyboardType="email-address"
            style={{
              width: "100%",
              paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
        <View style={styles.contView}>
          <Text style={styles.label}>Contraseña:</Text>
          <CustomInput
            value={userData.password}
            onChangeText={(text) =>
              setUserData({ ...userData, password: text })
            }
            style={{
              width: "100%",
              paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>

        <Funcionalidades
          style={styles.buttonSend}
          callFunction="SignUser"
          userSign={userData}
        >
          <Text style={styles.buttonText}>Iniciar sesion</Text>
        </Funcionalidades>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
