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
import { getAuth } from "firebase/auth";
import app, { db } from "../../../db/conection";
import firebaseAuth from "../../../db/conection";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
import LoginWithGoogle from "../../../functions/funcionalidades/LoginWithGoogle";
import LoginWithApple from "../../../functions/funcionalidades/LoginWithApple/LoginWithApple";
import LoginWithFacebook from "../../../functions/funcionalidades/LoginWithFacebook/LoginWithFacebook";
import LoginWithPhone from "../../../functions/funcionalidades/LoginWithPhone/LoginWithphone";
const { width, height } = Dimensions.get("window");

export default function Register() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const getImage = async () => {
    const image = await pickImage();
    setUserData({ ...userData, image });
  };
  const handlerNavigation = () => {
    navigation.navigate("RegisterPhone");
  };
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
              <Text style={styles.label}>Ingresa tu correo electrónico</Text>
              <View style={styles.passwordContainer}>
                <CustomInput
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                    paddingHorizontal: "45%",
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
                    paddingHorizontal: "45%",
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
            callFunction="RegisterUser"
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
              <Text>¿Ya tienes cuenta? {"\n"}</Text>
              <Text>Inicia sesion</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: 10,
            }}
          >
            <LoginWithGoogle />
            <LoginWithApple />
            <LoginWithFacebook />
            <LoginWithPhone
              icon="AntDesign"
              onPress={handlerNavigation}
              title="Continua con numero de telefono"
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
