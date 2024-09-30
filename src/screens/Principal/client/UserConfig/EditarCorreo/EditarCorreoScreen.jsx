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

export default function EditarCorreoScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Actualizar correo electronico",
      // headerLeft: () => (
      //   <View>
      //     <TouchableOpacity onPress={() => navigation.goBack()}>
      //       <Ionicons
      //         name="arrow-back-circle"
      //         size={30}
      //         color="black"
      //         style={styles.Icon}
      //       />
      //     </TouchableOpacity>
      //   </View>
      // ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getUser() {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(userRef, (doc) => {
          //console.log("User: ", doc.data().password);
          const data = doc.data();
          setUserData({
            email: data?.email || "",
            password: data?.password || "",
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

  const handleEmailChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      email: text,
    }));
  };

  if (isLoading) {
    return <Text>Cargando..</Text>;
  }

  if (error) {
    return <Text>Error!</Text>;
  }

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
        style={styles.container}
      >
        <View style={{ marginTop: -100 }}>
          <Text>Correo electronico</Text>
        </View>
        <View style={[styles.contView, { marginHorizontal: 10 }]}>
          <CustomInput
            value={userData.email} // Aquí se enlaza el valor al estado
            keyboardType="email-address"
            onChangeText={handleEmailChange}
            placeholderTextColor="black"
            placeholder="Correo electronico"
            style={{
              width: "100%",
              paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
        <View style={styles.contView}>
          <Funcionalidades
            disabled={false}
            callFunction="UpdateEmail"
            userUpdate={userData} // Pasar userData directamente
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
    </>
  );
}
