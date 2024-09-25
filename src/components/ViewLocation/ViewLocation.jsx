import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styles from "./styles";

export default function ViewLocation({ location }) {
  return (
    <View style={styles.container}>
      <View style={styles.viewCentral}>
        <Text style={styles.text}>{location}</Text>
      </View>
    </View>
  );
}
