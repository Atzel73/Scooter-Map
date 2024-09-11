import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "./styles";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import CustomTouchable from "../../../../../components/TouchableOpacity/touchableOpacity";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import CustomBox from "../../../../../components/CheckBox/CustomBox";
import { db } from "../../../../../db/conection";

export default function BorrarCuenta({ route }) {
  const navigation = useNavigation();
  const auth = getAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [remotePassword, setRemotePassword] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          onSnapshot(userRef, (doc) => {
            setRemotePassword(doc.data());
            console.log("Usuario encontrado");
          });
        } else {
          console.log("Usuario no encontrado");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Eliminar cuenta",
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

  const handleDeleteAccount = () => {
    if (selectedOption && userPassword === remotePassword.password) {
      // Aquí puedes realizar la lógica para eliminar la cuenta
      console.log("Eliminar cuenta");
      // Por ejemplo, podrías llamar a una función que maneje la eliminación del usuario
    } else {
      console.log(
        "Las contraseñas no coinciden o no se ha seleccionado una opción"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Eliminar cuenta
        </Text>
      </View>
      <View style={styles.header}>
        <Text>¿Seguro que quieres eliminar tu cuenta?</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.subtext}>
          En cuanto lo confirmes, tu información y datos desaparecerán.
        </Text>
      </View>
      <View style={styles.viewBoxes}>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 1}
            toggleBox={() => setSelectedOption(1)}
          />
          <Text style={styles.paragraph}>No utilizo mi cuenta</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 2}
            toggleBox={() => setSelectedOption(2)}
          />
          <Text style={styles.paragraph}>Es demasiado caro</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 3}
            toggleBox={() => setSelectedOption(3)}
          />
          <Text style={styles.paragraph}>Cambio de número telefónico</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 4}
            toggleBox={() => setSelectedOption(4)}
          />
          <Text style={styles.paragraph}>No disponible en mi ciudad</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 5}
            toggleBox={() => setSelectedOption(5)}
          />
          <Text style={styles.paragraph}>Motivos personales (otros)</Text>
        </View>
      </View>
      <Funcionalidades
        style={[styles.button, { width: "50%" }]}
        userDelete={remotePassword}
        callFunction="DeleteUser"
      >
        <Text
          style={[
            styles.paragraph,
            { color: "white", fontSize: 18, fontWeight: "bold" },
          ]}
        >
          Eliminar cuenta
        </Text>
        <View>
          <MaterialCommunityIcons
            name="emoticon-sad"
            size={24}
            color="white"
            style={styles.Icon}
          /> 
        </View>
      </Funcionalidades>
    </View>
  );
}
