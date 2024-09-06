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
export default function SoporteScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Preferencias de comunicación",
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
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "100%",
          backgroundColor: "#fff",
        }}
      >
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Consejos")}
          >
            <Text style={styles.buttonText}>Consejos y promociones</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Viajando")}
          >
            <Text style={styles.buttonText}>Viajando</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Ofertas")}
          >
            <Text style={styles.buttonText}>Oferta de terceros</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sugerencias")}
          >
            <Text style={styles.buttonText}>Sugerencias</Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
