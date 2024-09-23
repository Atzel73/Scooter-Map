import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CustomBox from "../../../../../components/CheckBox/CustomBox";
import styles from "./styles";
import Funcionalidades from "../../../../../functions/funcionalidades/functionsUser";

const PagosPrincipal = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handlerNavigation = () => {
    navigation.navigate("AgregarTarjeta");
  };
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

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.textTitle}>Agregar metodo de pago</Text>
          </View>
          <View>
            <Text style={styles.textSubtitle}>
              Elige el metodo de pagp que prefieres para realizar los viajes
            </Text>
          </View>
        </View>
        <View style={styles.viewBoxes}>
          <View style={styles.section}>
            <CustomBox
              onPress={() => handlerNavigation()}
              style={styles.box}
              isChecked={selectedOption === 1}
              toggleBox={() => setSelectedOption(1)}
            />
            <Text>Añadir una tarjeta de debito/ credito</Text>
          </View>
          <View style={styles.section}>
            <CustomBox
              style={styles.box}
              isChecked={selectedOption === 2}
              toggleBox={() => setSelectedOption(2)}
            />
            <Text>Paypal</Text>
          </View>
          <View style={styles.section}>
            <CustomBox
              style={styles.box}
              isChecked={selectedOption === 3}
              toggleBox={() => setSelectedOption(3)}
            />
            <Text>Mercado pago</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PagosPrincipal;
