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
  const [isChecked, setChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [remotePassword, setRemotePassword] = useState("");
  const toggleBox = () => setChecked(!isChecked);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>¿Seguro que quieres eliminar tu cuenta?</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.subtext}>
          En cuanto lo confirmes, tu informacion y datos desapareceran.{" "}
        </Text>
      </View>
      <View style={styles.viewBoxes}>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 1}
            toggleBox={() => handleOptionSelect(1)}
          />
          <Text style={styles.paragraph}>No utilizo mi cuenta</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 2}
            toggleBox={() => handleOptionSelect(2)}
          />
          <Text style={styles.paragraph}>Es demasiado caro</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 3}
            toggleBox={() => handleOptionSelect(3)}
          />
          <Text style={styles.paragraph}>Cambio de numero telefonico</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 4}
            toggleBox={() => handleOptionSelect(4)}
          />
          <Text style={styles.paragraph}>No disponible en mi ciudad</Text>
        </View>
        <View style={styles.section}>
          <CustomBox
            isChecked={selectedOption === 5}
            toggleBox={() => handleOptionSelect(5)}
          />
          <Text style={styles.paragraph}>Motivos personales (otros)</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => setIsOpen(true)}>
          <Text style={[styles.paragraph, { color: "white", fontSize: 18 }]}>
            ¿Desea eliminar su cuenta?
          </Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={{ margin: 10 }}>
            <TextInput
              //value={userPassword}
              onChangeText={setUserPassword}
              style={styles.input}
              placeholder="Contraseña actual"
            />
            {remotePassword?.password &&
            userPassword === remotePassword.password ? (
              <Funcionalidades
                style={styles.button}
                userDelete={remotePassword}
                callFunction="DeleteUser"
              >
                <Text
                  style={[styles.paragraph, { color: "white", fontSize: 18 }]}
                >
                  Eliminar cuenta
                </Text>
                <MaterialCommunityIcons
                  name="emoticon-sad-outline"
                  size={24}
                  color="white"
                  style={styles.Icon}
                />
              </Funcionalidades>
            ) : (
              <View>
                <Text>¡Las contraseñas no coinciden!</Text>
                <TouchableOpacity>
                  <Text>¿Has olvidado tu contraseña?</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
