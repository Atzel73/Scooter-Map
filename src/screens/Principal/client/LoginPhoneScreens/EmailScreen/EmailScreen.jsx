import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  updateEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../../../../components/TextInput/textInput";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import styles from "./styles";
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../../../../db/conection";
export default function EmailScreen({ route }) {
  //console.log("Datos entrantes: ", route.params.data.route.params.data);
  const auth = getAuth();
  const navigation = useNavigation();
  const { last_name, name } = route?.params?.data?.userData;
  const { password, phone } = route?.params?.data?.route?.params?.data;
  const [loading, isLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const empty =
    "https://firebasestorage.googleapis.com/v0/b/floydapp-a1e0d.appspot.com/o/Admin%2FuserEmpty.jpg?alt=media&token=19d2651d-f14e-4ae7-8629-489f512bfc78";
  const handleEmailChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: text,
    }));
  };
  async function RegisterUser() {
    try {
      isLoading(true);
      if (!userData.email) {
        alert("Por favor, introduzca el correo electronico");
        isLoading(false);
        return;
      }
      await createUserWithEmailAndPassword(auth, userData.email, password)
        .then((userCredentials) => {
          setDoc(doc(db, "users", userCredentials.user.uid), {
            photo: empty,
            name: name,
            last_name: last_name,
            email: userCredentials.user.email,
            phone: phone,
            password: password,
            status: "Activo",
            rol: "usuario",
            scooter_id: "",
            created_at: new Date(),
            verifyByEmail: true,
          });
          Alert.alert("¡Bienvenido!");
          //navigation.navigate("Principal");
          isLoading(false);
          navigation.navigate("Principal");
          console.log("Registrado");
        })
        .catch((error) => {
          isLoading(false);
          if (error.code === "auth/invalid-email") {
            Alert.alert("El email es inválido");
          } else if (error.code === "auth/missing-email") {
            Alert.alert("El email es obligatorio");
          } else if (error.code === "auth/email-already-in-use") {
            Alert.alert("El email ya está en uso");
          }
        });
    } catch (error) {
      console.log("Error: ", error);
      isLoading(false);
      setError(true);
    }
  }
  if (error) {
    return (
      <View style={{ marginTop: "50%", justifyContent: "center" }}>
        <TouchableOpacity>
          <Text>Ha habido un error al crear la cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={{ marginTop: "50%", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6BB8FF" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text>Ingresar correo electronico</Text>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <View style={styles.passwordContainer}>
          <CustomInput
            value={userData.email}
            onChangeText={handleEmailChange}
            keyboardType="email"
            placeholderTextColor="black"
            placeholder="Correo electronico"
            style={{
              width: "100%",
              //paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
      <View style={styles.contView}>
        <TouchableOpacity onPress={RegisterUser} style={styles.buttonSend}>
          <Text style={styles.subText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
