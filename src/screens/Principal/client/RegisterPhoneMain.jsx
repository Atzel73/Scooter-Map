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
  Image,
  TextInput,
} from "react-native";
import CustomInput from "../../../components/TextInput/textInput";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import pickImage from "../../../functions/cameraPicker/imagePicker";
import styles from "../StylesLoginRegister/styles";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import app, { db } from "../../../db/conection";
import firebaseAuth from "../../../db/conection";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
import LoginWithGoogle from "../../../functions/funcionalidades/LoginWithGoogle";
import LoginWithApple from "../../../functions/funcionalidades/LoginWithApple/LoginWithApple";
import LoginWithFacebook from "../../../functions/funcionalidades/LoginWithFacebook/LoginWithFacebook";
import LoginWithPhone from "../../../functions/funcionalidades/LoginWithPhone/LoginWithphone";
import LoginWithGuest from "../../../functions/funcionalidades/LoginWithGuest";

const { width, height } = Dimensions.get("window");

export default function RegisterPhoneMain() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const [confirm, setConfirm] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const getImage = async () => {
    const image = await pickImage();
    setUserData({ ...userData, image });
  };
  const handlerNavigation = () => {
    navigation.goBack();
  };

  const RegisterWithPhone = async () => {
    if (!userData.phone || !userData.password) {
      setError(true);
      return;
    }
    try {
      const confirmation = await signInWithPhoneNumber(auth, userData.phone);
      console.log("Resultado: ", confirmation);
      //setConfirm(confirmation);
    } catch (error) {
      console.log(error);
    }
  };
  if (confirm) {
    navigation.navigate("Verificar");
  }
  if (error) {
    return (
      <View style={{ alignItems: "center", marginTop: "50%" }}>
        <TouchableOpacity onPress={() => setError(false)}>
          <Text>Ha habido un error</Text>
        </TouchableOpacity>
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
        style={styles.formContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {userData.image && (
            <View style={styles.inputContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: userData.image }} style={styles.image} />
              </View>
            </View>
          )}
          <View style={{ marginTop: "10%" }}>
            <View style={styles.contView}>
              <Text style={styles.label}>Ingresa tu numero de telefono</Text>
              <View style={styles.passwordContainer}>
                <CustomInput
                  value={userData.phone}
                  onChangeText={(text) =>
                    setUserData({ ...userData, phone: text })
                  }
                  keyboardType="numeric"
                  style={{
                    width: "100%",
                    marginHorizontal: 10,
                  }}
                />
              </View>
            </View>
            <View style={styles.contView}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordContainer}>
                <CustomInput
                  value={userData.password}
                  onChangeText={(text) =>
                    setUserData({ ...userData, password: text })
                  }
                  secureTextEntry={!showPassword}
                  style={{
                    width: "100%",
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

          <Funcionalidades
            style={styles.buttonSend}
            user={userData}
            onPress={RegisterWithPhone}
            //callFunction="RegisterUser"
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </Funcionalidades>
          <View style={styles.contView}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>¿Ya tienes cuenta? Inicia sesion</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: 10,
            }}
          >
            <LoginWithGuest
              onPress={() => navigation.navigate("Principal")}
              title="Continua como invitado"
            />
            <LoginWithGoogle />
            <LoginWithApple />
            <LoginWithFacebook />
            <LoginWithPhone
              icon="Material"
              onPress={handlerNavigation}
              title="Continua con correo electronico"
            />
          </View>
          <View style={{ alignItems: "center", margin: 20 }}>
            <Text style={{ fontSize: 12 }}>
              {" "}
              Al continuar, aceptas recibir llamadas, Whatsapp o SMS de
              FloydRide.
            </Text>
          </View>
        </ScrollView>
        <View style={styles.viewBottom} />
      </KeyboardAvoidingView>
    </>
  );
}
