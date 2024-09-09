import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../../db/conection";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import CustomInput from "../../../../components/TextInput/textInput";
export default function LoginName() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
  async function updateUser() {
    console.log("Dentro de login name", auth.currentUser.uid);
    try {
    //   if (!userData.name || !userData.last_name) {
    //     alert("Por favor, no deje campos vacios");
    //     return;
    //   }
      const userData = {
        updated_at: new Date(),
        name: "userData.name",
        last_name: "userData.last_name",
      };
      const userRef = await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        userData
      );
      console.log("User updated");
      //Alert.alert("¡Nombre actualizados");
      navigation.navigate("Principal")
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View>
        <Text>¿Cual es tu nombre?</Text>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <CustomInput
          value={userData.name}
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
          value={userData.last_name}
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
        <TouchableOpacity onPress={() => updateUser()}>
          <Text>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  buttonFloat: {
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    //elevation: 5,
    //shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  buttonText: {
    width: "95%",
    fontSize: 16,
    marginLeft: 10,
  },
  contView: {
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  viewHead: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -300,
    margin: "10%",
    padding: "10%",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginTop: -300,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
  },
  viewField: {
    marginHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    marginBottom: 10,
    width: "95%",
    minWidth: 350,
  },
});
