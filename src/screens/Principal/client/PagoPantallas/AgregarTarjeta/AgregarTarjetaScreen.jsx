import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import paisesDelmundo from "../../../../../../assets/JSON/paisesDelmundo.json";
import CustomInput from "../../../../../components/TextInput/textInput";
import CustomTouchable from "../../../../../components/TouchableOpacity/touchableOpacity";
import styles from "./styles";

const { width, height } = Dimensions.get("window");

export default function AgregarTarjetaScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    setPaises(
      paisesDelmundo.map((pais) => ({
        label: pais.shortName,
        value: pais.ISO3,
        key: pais.ISO3,
      }))
    );
  }, []);
  const selectedItem = {
    title: "Selected item title",
    description: "Secondary long descriptive text ...",
  };
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
            <View style={[styles.passwordContainer, stylesPicker.inputAndroid]}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedOption(value)}
                items={paises}
                style={{
                  inputAndroid: {
                    backgroundColor: "transparent",
                    width: "50%",
                    height: 50,
                    padding: 10,
                  },
                  iconContainer: {
                    top: 5,
                    right: 15,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return (
                    <Ionicons
                      name="chevron-down-outline"
                      size={24}
                      color="black"
                      style={{ marginTop: 10 }}
                    />
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", width: "100%" }}>
          <CustomTouchable style={styles.buttonSend}>
            <Text style={styles.buttonText}>Guardar</Text>
          </CustomTouchable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const stylesPicker = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    backgroundColor: "#fff",
    marginLeft: "5%",
    marginRight: "5%",
  },
  inputAndroid: {
    borderRadius: 5,
    borderWidth: 0.1,
    padding: 10,
  },
});
