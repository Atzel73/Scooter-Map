import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../../../../../components/TextInput/textInput";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import styles from "./styles";

export default function NameScreen({ route }) {
  //console.log("Datos entrantes: ", route.params.data);
  const navigation = useNavigation();
  const auth = getAuth();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ name: "", last_name: "" });

  const handleNameChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      name: text,
    }));
  };

  const handleLastNameChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      last_name: text,
    }));
  };

  const handlerRegisterPhone = () => {
    if (!userData.name || !userData.last_name) {
      alert("Por favor, no deje campos vacios");
      return;
    }
    if (userData.name || userData.last_name) {
      navigation.navigate("Email", {
        data: {
          userData,
          route
        },
      });
    }
  };
  if (isLoading) {
    return (
      <View style={{ alignItems: "center", marginTop: "50%" }}>
        <ActivityIndicator color="#6BB8FF" size="large" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={{ alignItems: "center", marginTop: "50%" }}>
        <Text>Error al actualizar:</Text>
        <TouchableOpacity onPress={() => setError(false)}>
          <Text>
            Presione para volver a intentar. Si el problema persiste, contacte a
            soporte.
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text>Agrega tu nombre</Text>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <View style={styles.passwordContainer}>
          <CustomInput
            value={userData.name}
            onChangeText={handleNameChange}
            placeholderTextColor="black"
            placeholder="Nombre"
            style={{
              width: "100%",
              //paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <View style={styles.passwordContainer}>
          <CustomInput
            value={userData.last_name}
            onChangeText={handleLastNameChange}
            placeholderTextColor="black"
            placeholder="Apellido"
            style={{
              width: "100%",
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
      <View style={styles.contView}>
        <TouchableOpacity
          onPress={handlerRegisterPhone}
          style={styles.buttonSend}
        >
          <Text style={styles.subText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
