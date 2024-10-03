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
import { CreateCard } from "../../../../../functions/Tarjetas/crearTarjeta";
const { width, height } = Dimensions.get("window");

export default function AgregarTarjetaScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [paises, setPaises] = useState([]);
  const [isLoadButton, setIsLoadButton] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardType, setCardType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [cvvErrorMessage, setCvvErrorMessage] = useState("");
  const [expirationErrorMessage, setExpirationErrorMessage] = useState("");

  const validateExpirationDate = (expirationDate) => {
    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      return false;
    }

    const [month, year] = expirationDate
      .split("/")
      .map((str) => parseInt(str, 10));

    if (month < 1 || month > 12) {
      return false;
    }

    // Obtenemos el año actual en formato de dos dígitos
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1

    // Verifica que la tarjeta no esté vencida
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  };

  const validateCVV = (cvv, cardType) => {
    const sanitizedCVV = cvv.trim();

    if (!/^\d+$/.test(sanitizedCVV)) {
      return false;
    }

    if (cardType === "Amex") {
      return sanitizedCVV.length === 4;
    } else {
      return sanitizedCVV.length === 3;
    }
  };

  const validateCreditCardNumber = (cardNumber) => {
    const sanitizedCardNumber = cardNumber.replace(/\D/g, "");

    let sum = 0;
    let shouldDouble = false;

    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedCardNumber[i], 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };
  const handleSave = async () => {
    if (!validateCreditCardNumber(cardNumber)) {
      setErrorMessage("Número de tarjeta inválido");
    } else if (!validateCVV(cvv, cardType)) {
      setCvvErrorMessage("CVV inválido");
    } else if (!validateExpirationDate(expirationDate)) {
      setExpirationErrorMessage("Fecha de vencimiento inválida");
    } else if (!selectedOption) {
      setErrorMessage("Por favor seleccione un país");
    } else {
      setIsLoadButton(true);
      setErrorMessage("");
      setCvvErrorMessage("");
      setExpirationErrorMessage("");
      const CardData = {
        number: cardNumber,
        cvv: cvv,
        type: cardType,
        expiration_date: expirationDate,
        country: selectedOption,
      };
      CreateCard(CardData);
      setIsLoadButton(false);
      navigation.goBack();
    }
  };
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
                maxLength={19}
                placeholder="xx-xxx--xx-xx-xx-xx-"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
                style={[styles.input, { backgroundColor: "#D9D9D9" }]}
              />

              <View style={styles.Divider} />
            </View>
          </View>
          <View style={styles.viewInput}>
            <View style={styles.viewInput1}>
              <CustomInput
                maxLength={5}
                // keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="MM/AA"
                value={expirationDate}
                onChangeText={(text) => setExpirationDate(text)}
              />
              <View style={styles.textFloat}>
                <Text>Fecha de vencimiento</Text>
              </View>
            </View>
            <View style={styles.viewInput2}>
              <CustomInput
                maxLength={3}
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="123"
                keyboardType="numeric"
                value={cvv}
                onChangeText={(text) => setCVV(text)}
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
          {errorMessage ? (
            <Text style={{ color: "red" }}>{errorMessage}</Text>
          ) : null}
          {cvvErrorMessage ? (
            <Text style={{ color: "red" }}>{cvvErrorMessage}</Text>
          ) : null}
          {expirationErrorMessage ? (
            <Text style={{ color: "red" }}>{expirationErrorMessage}</Text>
          ) : null}

          <CustomTouchable
            style={[isLoadButton ? styles.loadButton : styles.buttonSend]}
            onPress={handleSave}
            disabled={isLoadButton}
          >
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
