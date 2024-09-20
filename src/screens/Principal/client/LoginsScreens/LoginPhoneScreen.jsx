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
import { db } from "../../../../db/conection";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import CustomInput from "../../../../components/TextInput/textInput";
export default function LoginPhone() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ phone: "" });

  const handlePhoneChange = (text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: text,
    }));
  };

  async function updateUser() {
    if (!userData.phone) {
      Alert.alert("Por favor, no deje campos vacios");
      return;
    }
    try {
      setIsLoading(true);
      const userDataUpdate = {
        updated_at: new Date(),
        phone: userData.phone,
      };
      const userRef = await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        userDataUpdate
      );
      setIsLoading(false);
      navigation.navigate("Principal");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  }
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
        <Text>Ingresa tu numero de telefono</Text>
      </View>
      <View style={[styles.contView, { marginHorizontal: 10 }]}>
        <View style={styles.passwordContainer}>
          <CustomInput
            keyboardType="numeric"
            value={userData.phone}
            onChangeText={handlePhoneChange}
            placeholderTextColor="black"
            placeholder="618..."
            style={{
              width: "100%",
              marginHorizontal: 10,
            }}
          />
        </View>
      </View>
      <View style={styles.contView}>
        <TouchableOpacity
          onPress={() => updateUser()}
          style={styles.buttonSend}
        >
          <Text style={styles.subText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginRight: "5%",
  },
  subText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  buttonSend: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3474B0",
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },
  buttonFloat: {
    position: "absolute",
    top: 50,
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
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
    width: "100%",
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
