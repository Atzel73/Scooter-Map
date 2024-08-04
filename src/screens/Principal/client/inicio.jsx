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
  Image,
  TextInput,
} from "react-native";
import CustomInput from "../../../components/TextInput/textInput";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import pickImage from "../../../functions/cameraPîcker/imagePicker";
import styles from "../StylesLoginRegister/styles";
import { getAuth } from "firebase/auth";
import app, { db } from "../../../db/conection";
import firebaseAuth from "../../../db/conection";
import Funcionalidades from "../../../functions/funcionalidades/functionsUser";
const { width, height } = Dimensions.get("window");

export default function Register() {
  //auth es la sesion iniciada del usuario
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});

  const getImage = async () => {
    const image = await pickImage();
    setUserData({ ...userData, image });
  };
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
          {userData.image && (
            <View style={styles.inputContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: userData.image }} style={styles.image} />
              </View>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={getImage}
            >
              <Text>Por favor, seleccione una imagen para su perfil</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.label}>Numero de telefono:</Text>
            <CustomInput
              keyboardType="numeric"
              value={userData.phone}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
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
              <Funcionalidades
                style={styles.buttonSend}
                user={userData}
                callFunction="RegisterUser"
              >
                <Text style={styles.buttonText}>Enviar</Text>
                <FontAwesome name="send" size={20} color="white" />
              </Funcionalidades>
              {/* <TouchableOpacity style={styles.buttonSend}>
                <Text style={styles.buttonText}>Enviar</Text>
                <FontAwesome name="send" size={20} color="white" />
              </TouchableOpacity> */}
            </View>
          )}
        <View style={{ alignItems: "center" }}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text>¿Ya tienes cuenta? Inicia sesion</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={{ alignItems: "center" }}>
              <Text>Iniciar sesion con Google</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === "ios" && (
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Text>Iniciar sesion con Apple</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
