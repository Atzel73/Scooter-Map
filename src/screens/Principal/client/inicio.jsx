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
import { FontAwesome, Ionicons } from "@expo/vector-icons";
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

  const getImage = async () => {
    const image = await pickImage();
    setUserData({ ...userData, image });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            //style={{ marginLeft: 10 }}
          >
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
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
        {/* <View style={styles.inputContainer}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={getImage}
            >
              <Text>Por favor, seleccione una imagen para su perfil</Text>
            </TouchableOpacity>
          </View> */}
        {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre:</Text>
            <CustomInput
              style={styles.input}
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
          </View> */}
        {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellido:</Text>
            <CustomInput
              value={userData.lastName}
              onChangeText={(text) =>
                setUserData({ ...userData, lastName: text })
              }
              style={styles.input}
            />
          </View> */}
        {/* <View style={styles.inputContainer}>
            <Text style={styles.label}>Numero de telefono:</Text>
            <CustomInput
              keyboardType="numeric"
              value={userData.phone}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
              style={styles.input}
            />
          </View> */}
        <View style={styles.contView}>
          <Text style={styles.label}>Ingresa tu electrónico</Text>
          <CustomInput
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
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
        {userData.password && (
          <View style={styles.contView}>
            <Text style={styles.label}>Confirme su contraseña</Text>
            <CustomInput
              value={userData.confirmPassword}
              onChangeText={(text) =>
                setUserData({ ...userData, confirmPassword: text })
              }
              secureTextEntry
              style={{
                width: "100%",
                paddingHorizontal: "45%",
                marginHorizontal: 10,
              }}
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

        {
          // userData.name &&
          //   userData.lastName &&
          userData.email && userData.password === userData.confirmPassword && (
            <>
              <Funcionalidades
                style={styles.buttonSend}
                user={userData}
                callFunction="RegisterUser"
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </Funcionalidades>
            </>
          )
        }
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
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
        >
          <LoginWithGoogle />
          <LoginWithApple />
          <LoginWithFacebook />
          <LoginWithPhone />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
