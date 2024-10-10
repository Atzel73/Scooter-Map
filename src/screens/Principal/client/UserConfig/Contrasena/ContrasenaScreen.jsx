import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import CustomInput from "../../../../../components/TextInput/textInput";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default function ContrasenaScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const resetPassword = () => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.email === undefined) {
      Alert.alert(
        "Error",
        "Por favor ingrese su dirección de correo electrónico para recuperar la contraseña"
      );
    } else if (!emailRegex.test(user.email)) {
      Alert.alert(
        "Error",
        "Por favor ingrese su dirección de correo electrónico para recuperar la contraseña"
      );
    } else {
      sendPasswordResetEmail(auth, user.email)
        .then(() => {
          Alert.alert(
            "Correo enviado",
            "Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña. Por favor, revisa tu bandeja de entrada."
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // Manejar errores de envío de correo aquí
        });
    }
  };
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <View style={styles.viewFlotante}>
          <View style={styles.buttonFloat}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textTitle}>Recuperacion de contraseña</Text>
          </View>
          <View style={styles.contView}>
            <View style={styles.passwordContainer}>
              <View style={styles.iconFlotante}>
                <MaterialIcons name="error" size={25} color="black" />
              </View>
              <CustomInput
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                placeholder="Numero de telefono"
                keyboardType="email"
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white", // Fondo blanco para CustomInput
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
          <View style={styles.contView}>
            <View style={styles.passwordContainer}>
              <CustomInput
                placeholder="Codigo de verificacion"
                keyboardType="numeric"
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: "white",
                  marginHorizontal: 10,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.Divider} />
        <View style={styles.viewText}>
          <Text>
            Se envio a tu teléfono un mensaje de texto con un codigo de
            confirmación para la recuperación de la cuenta.
          </Text>
        </View>
        <View style={{ marginBottom: "10%", alignItems: "center" }}>
          <Funcionalidades style={styles.buttonSend} onPress={resetPassword}>
            <Text style={styles.buttonText}>
              Confirmar cambio de contraseña
            </Text>
          </Funcionalidades>
        </View>
      </KeyboardAvoidingView>
      <View style={[styles.viewBottom, { marginBottom: 0.1 }]} />
    </>
  );
}
