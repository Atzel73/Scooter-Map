import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunity,
} from "@expo/vector-icons";
import styles from "./styles";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";
import CustomInput from "../../../../../components/TextInput/textInput";
import CustomTouchable from "../../../../../components/TouchableOpacity/touchableOpacity";

const { width, height } = Dimensions.get("window");
export default function AgregarTarjetaScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <View style={styles.viewFlotante}>
          <View style={styles.buttonFloat}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-circle"
                size={35}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textTitle}>Agrega una tarjeta</Text>
          </View>
          <View style={styles.contView}>
            <View style={styles.passwordContainer}>
              <Text style={{ marginLeft: "5%" }}>Numero de tarjeta</Text>
              <CustomInput
                placeholder="xx-xxx--xx-xx-xx-xx-"
                keyboardType="numeric"
                style={[styles.input, { backgroundColor: "#D9D9D9" }]}
              />
              <View style={styles.Divider} />
            </View>
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewInput1}>
              <CustomInput
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="MM/AA"
              />
              <View style={styles.textFloat}>
                <Text>Fecha de vencimiento</Text>
              </View>
            </View>
            <View style={styles.viewInput2}>
              <CustomInput
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="123"
              />
              <View style={styles.textFloat}>
                <Text>Codigo de verificacion</Text>
              </View>
            </View>
          </View>
          <View style={styles.contView}>
            <View style={{ marginRight: "90%" }}>
              <Text>Pais</Text>
            </View>
            <View style={styles.passwordContainer}>
            </View>
          </View>
        </View>

        <View>
          <CustomTouchable style={styles.buttonSend}>
            <Text style={styles.buttonText}>Guardar</Text>
          </CustomTouchable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
