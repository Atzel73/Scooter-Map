import React, { useState, useEffect, useRef } from "react";
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
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import app, { db, auth } from "../../../db/conection";
import firebaseAuth from "../../../db/conection";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
import LoginWithGoogle from "../../../functions/funcionalidades/LoginWithGoogle";
import LoginWithApple from "../../../functions/funcionalidades/LoginWithApple/LoginWithApple";
import LoginWithFacebook from "../../../functions/funcionalidades/LoginWithFacebook/LoginWithFacebook";
import LoginWithPhone from "../../../functions/funcionalidades/LoginWithPhone/LoginWithphone";
import LoginWithGuest from "../../../functions/funcionalidades/LoginWithGuest";

const { width, height } = Dimensions.get("window");

export default function RegisterPhoneMain() {
  // const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const recaptchaVerifierRef = useRef(null);

  function validarPassword(input) {
    var p = input,
      errors = [];

    if (p.length < 8) {
      errors.push("Tu contraseña debe tener al menos 8 caracteres. ");
    }

    if (!/[A-Z]/.test(p)) {
      errors.push("Tu contraseña debe tener al menos una letra mayuscula. ");
    }

    if (errors.length > 0) {
      alert(errors.join("n"));
      return false;
    }

    return true;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlePhoneChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: text,
    }));
  };
  const handlePassChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      password: text,
    }));
  };
  const handlerRegisterPhone = () => {
    console.log("Phone: ", userData);

    if (!userData.password || !userData.password) {
      alert("Por favor, no deje campos vacios");
      return;
    }
    if (!validarPassword(userData.password)) {
      return;
    }
    if (
      validarPassword(userData.password) &&
      userData.phone &&
      userData.password
    ) {
      navigation.navigate("Nombre", { data: userData });
    }
  };

  const handlerNavigation = () => {
    navigation.goBack();
  };

  // if (confirm) {
  //   navigation.navigate("Verificar");
  // }
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
          <View style={{ marginTop: "10%" }}>
            <View style={styles.contView}>
              <Text style={styles.label}>Ingresa tu numero de telefono</Text>
              <View style={styles.passwordContainer}>
                <CustomInput
                  value={userData.phone}
                  onChangeText={handlePhoneChange}
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
                  onChangeText={handlePassChange}
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
            onPress={handlerRegisterPhone}
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
      <View style={{ display: "none" }} ref={recaptchaVerifierRef} />
    </>
  );
}
