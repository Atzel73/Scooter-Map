import React from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import CustomInput from "../../../../../components/TextInput/textInput";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
export default function ContrasenaScreen() {
  const navigation = useNavigation();

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
              <View
                style={styles.iconFlotante}
              >
                <MaterialIcons name="error" size={25} color="black" />
              </View>
              <CustomInput
                placeholder="Numero de telefono"
                keyboardType="numeric"
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
          <Funcionalidades style={styles.buttonSend}>
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
