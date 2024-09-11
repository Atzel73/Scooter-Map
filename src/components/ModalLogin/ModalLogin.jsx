import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import styles from "./styles";
import { getAuth } from "firebase/auth";
import CustomInput from "../TextInput/textInput";
import Funcionalidades from "../../functions/funcionalidades/functionsUser";
import LoginWithApple from "../../functions/funcionalidades/LoginWithApple/LoginWithApple";
import LoginWithFacebook from "../../functions/funcionalidades/LoginWithFacebook/LoginWithFacebook";
import LoginWithGoogle from "../../functions/funcionalidades/LoginWithGoogle";
import LoginWithPhone from "../../functions/funcionalidades/LoginWithPhone/LoginWithphone";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ModalLogin({ modalVisibleLogin, toggleModalLogin }) {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("invitado", "invitado");
      console.log("Guardado");
    } catch (e) {
      console.log("Error en async storage: ", e);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.formContainer}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleLogin}
        onRequestClose={toggleModalLogin}
        statusBarTranslucent={true}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={{ marginTop: "10%" }}>
            <View style={styles.contView}>
              <Text style={styles.label}>Ingresa tu correo electrónico</Text>
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
            <View style={styles.contView}>
              <Text style={styles.label}>Contraseña</Text>
              <CustomInput
                value={userData.password}
                onChangeText={(text) =>
                  setUserData({ ...userData, password: text })
                }
                secureTextEntry
                style={{
                  width: "100%",
                  paddingHorizontal: "45%",
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
          <Funcionalidades
            style={styles.buttonSend}
            user={userData}
            callFunction="RegisterUserModal"
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </Funcionalidades>
          <View style={styles.contView}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                navigation.navigate("Iniciar Sesion", { screen: "Login" });
                  //toggleModalLogin(!modalVisibleLogin);
              }}
            >
              <Text>¿Ya tienes cuenta? Inicia sesion</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                toggleModalLogin(!modalVisibleLogin);
                storeData(true);
              }}
            >
              <Text>Continuar como invitado</Text>
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
            <LoginWithGoogle />
            <LoginWithApple />
            <LoginWithFacebook />
            <LoginWithPhone />
          </View>
          <View style={{ alignItems: "center", margin: 20 }}>
            <Text style={{ fontSize: 12 }}>
              {" "}
              Al continuar, aceptas recibir llamadas, Whatsapp o SMS de
              FloydRide.
            </Text>
          </View>
        </ScrollView>
      </Modal>
    </KeyboardAvoidingView>
  );
}
