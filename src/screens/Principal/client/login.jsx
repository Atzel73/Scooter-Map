import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../../../components/TextInput/textInput";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import pickImage from "../../../functions/cameraPicker/imagePicker";
import styles from "../StylesLoginRegister/styles";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
const { width, height } = Dimensions.get("window");

export default function Login() {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#E2F0EE", "#91B2DC", "#4772A9"]}
          style={styles.formContainer}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo electrónico:</Text>
            <CustomInput
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              keyboardType="email-address"
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña:</Text>
            <CustomInput
              style={styles.input}
              value={userData.password}
              onChangeText={(text) => setUserData({ ...userData, password: text })}
            />
          </View>

          <Funcionalidades
            style={styles.buttonSend}
            callFunction="SignUser"
            userSign={userData}
          >
            <Text style={styles.buttonText}>Iniciar sesion</Text>
            <FontAwesome name="sign-out" size={20} color="white" />
          </Funcionalidades>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
