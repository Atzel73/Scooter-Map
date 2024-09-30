import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "./styles";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
export default function EliminadaScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Principal");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Cuenta eliminada</Text>
      </View>
      <View style={styles.viewDelete}>
        <Image
          style={styles.image}
          source={require("../../../assets/Icons/EmojiSad.png")}
        />
        <Text>¡Nos vemos pronto!</Text>
      </View>
      <View style={styles.viewBottom} />
    </View>
  );
}
