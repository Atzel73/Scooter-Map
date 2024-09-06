import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import {
  FontAwesome,
  Ionicons,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";
export default function OfertaScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Sorpresas",
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "100%",
      }}
    >
      <View>
        <Text> Obten grandes sorpresas para nuestros socios. </Text>
      </View>
      <View style={styles.contView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Correo electronico</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="black"
            style={styles.Icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sms</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="black"
            style={styles.Icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
