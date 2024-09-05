import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import CustomInput from "../../../../../components/TextInput/textInput";
import styles from "./styles";
import { db } from "../../../../../db/conection";

export default function EditarNumeroScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: "",
    last_name: "",
    phone: "",
  });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Actualizar  número de teléfono",
      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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

  useEffect(() => {
    async function getUser() {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(userRef, (doc) => {
          const data = doc.data();
          setUserData({
            name: data?.name || "",
            last_name: data?.last_name || "",
            phone: data?.phone || "",
          });
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setError(true);
      }
    }
    getUser();
  }, []);

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

  const handlePhoneChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: text,
    }));
  };

  if (isLoading) {
    return <Text>Cargando..</Text>;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text>Escribe tu número de teléfono</Text>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <CustomInput
          value={userData.phone}
          keyboardType="numeric"
          onChangeText={handlePhoneChange}
          placeholderTextColor="black"
          placeholder="Número de teléfono"
          style={{
            width: "100%",
            paddingHorizontal: "45%",
            marginHorizontal: 10,
          }}
        />
      </View>
      <View style={styles.contView}>
        <Funcionalidades
          callFunction="UpdateUserPhone"
          userUpdate={userData}
          style={styles.button}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontStyle: "italic",
            }}
          >
            Guardar
          </Text>
        </Funcionalidades>
      </View>
    </KeyboardAvoidingView>
  );
}
