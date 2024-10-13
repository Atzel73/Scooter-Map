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
import AwesomeAlert from "react-native-awesome-alerts";

export default function EditarNombreScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ name: "", last_name: "" });
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setIsSuccess] = useState(false);
  useEffect(() => {
    async function getUser() {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(userRef, (doc) => {
          const data = doc.data();
          setUserData({
            name: data?.name || "",
            last_name: data?.last_name || "",
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

  if (isLoading) {
    return <Text>Cargando..</Text>;
  }

  if (error) {
    return (
      <View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Error"
          titleStyle={styles.title}
          message="Ha habido un error al actualizar tus datos. Si el problema persiste, contacte con el administrador."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          cancelButtonTextColor="red"
          showConfirmButton={true}
          confirmText="OK"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
      </View>
    );
  }
  if (showAlert) {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¡Éxito!"
        message="Se ha actualizado tu nombre correctamente."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        cancelButtonTextColor="red"
        showConfirmButton={true}
        confirmText="OK"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    );
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
        <View>
          <Text>Escribe tu nombre tal cual aparece en tu INE</Text>
        </View>
        <View style={[styles.contView, { marginHorizontal: 10 }]}>
          <CustomInput
            value={userData.name} // Aquí se enlaza el valor al estado
            onChangeText={handleNameChange}
            placeholderTextColor="black"
            placeholder="Nombre"
            style={{
              width: "100%",
              paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
        <View style={[styles.contView, { marginHorizontal: 10 }]}>
          <CustomInput
            value={userData.last_name} // Aquí se enlaza el valor al estado
            onChangeText={handleLastNameChange}
            placeholderTextColor="black"
            placeholder="Apellido"
            style={{
              width: "100%",
              paddingHorizontal: "45%",
              marginHorizontal: 10,
            }}
          />
        </View>
        <View style={styles.contView}>
          <Funcionalidades
            callFunction="UpdateUserName"
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
