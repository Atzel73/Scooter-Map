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
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function VerifyCode({ route }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const verifyCode = async () => {
    try {
      // Verificar el código ingresado
      const result = await confirmation.confirm(code);
      console.log("Usuario verificado:", result.user);

      // Si todo es correcto, puedes redirigir al usuario a otra pantalla (por ejemplo, pantalla principal)
      //navigation.navigate("Home"); // O la pantalla que prefieras

      console.log("Funcionando");
    } catch (error) {
      console.log("Error al verificar el código:", error);
      setError(true);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Introduce el código que recibiste por SMS:</Text>
      <TextInput
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Verificar" onPress={verifyCode} />

      {error && (
        <View style={{ alignItems: "center", marginTop: "50%" }}>
          <TouchableOpacity onPress={() => setError(false)}>
            <Text style={{ color: "red" }}>Ha habido un error</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
