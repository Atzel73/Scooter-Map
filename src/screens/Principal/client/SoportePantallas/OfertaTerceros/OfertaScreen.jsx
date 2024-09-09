import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text, Switch } from "react-native";
import {
  FontAwesome,
  Ionicons,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";
export default function OfertaScreen() {
  const navigation = useNavigation();

  const [isEnabledEmail, setIsEnabledEmail] = useState(false);
  const toggleSwitchEmail = () =>
    setIsEnabledEmail((previousState) => !previousState);

  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const toggleSwitchSMS = () =>
    setIsEnabledSMS((previousState) => !previousState);

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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100%",
          backgroundColor: "white",
        }}
      >
        <View>
          <Text> Obten grandes sorpresas para nuestros socios. </Text>
        </View>
        <View style={styles.contView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Correo electronico</Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: "#D9D9D9", true: "#6BB8FF" }}
              thumbColor={isEnabledEmail ? "#fff" : "#6BB8FF"}
              ios_backgroundColor="##6BB8FF"
              onValueChange={toggleSwitchEmail}
              value={isEnabledEmail}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contView}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sms</Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: "#D9D9D9", true: "#6BB8FF" }}
              thumbColor={isEnabledSMS ? "#fff" : "#6BB8FF"}
              ios_backgroundColor="##6BB8FF"
              onValueChange={toggleSwitchSMS}
              value={isEnabledSMS}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
