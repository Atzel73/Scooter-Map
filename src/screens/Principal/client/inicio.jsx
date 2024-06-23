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

const { width, height } = Dimensions.get("window");

export default function MainScreen() {
  const [userData, setUserData] = useState({});
  
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
            <Text style={styles.label}>Nombre:</Text>
            <CustomInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido:</Text>
            <CustomInput
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData({ ...userData, lastName: text })
              }
              style={styles.input}
            />
          </View>
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
              value={userData.password}
              onChangeText={(text) =>
                setUserData({ ...userData, password: text })
              }
              secureTextEntry
              style={styles.input}
            />
          </View>
          {userData.password && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirme su contraseña:</Text>
              <CustomInput
                value={userData.confirmPassword}
                onChangeText={(text) =>
                  setUserData({ ...userData, confirmPassword: text })
                }
                secureTextEntry
                style={styles.input}
              />
            </View>
          )}
          {userData.password &&
            userData.confirmPassword &&
            userData.password !== userData.confirmPassword && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Las contraseñas no coinciden, por favor intente de nuevo
                </Text>
              </View>
            )}
        </LinearGradient>
        {userData.name &&
          userData.lastName &&
          userData.email &&
          userData.password === userData.confirmPassword && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonSend}>
                <Text style={styles.buttonText}>Enviar</Text>
                <FontAwesome name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: width * 0.9,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  errorContainer: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fdd",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#d00",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonSend: {
    width: "90%",
    height: 45,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "white",
    marginRight: 10,
  },
});
