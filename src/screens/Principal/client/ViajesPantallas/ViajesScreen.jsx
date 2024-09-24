import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
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
export default function ViajesScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [error, isError] = useState(false);

  if (loading) {
    return (
      <View style={{ marginTop: "100%", alignItems: "center" }}>
        <ActivityIndicator color="#6BB8FF" size="large" />
      </View>
    );
  }
  // if (isEmpty) {
  //   return (
  //     <View style={{ marginTop: "100%", alignItems: "center" }}>
  //       <Text>Por ahora no tienes ningun viaje.</Text>
  //     </View>
  //   );
  // }
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
            <Text style={styles.textTitle}>Mis viajes</Text>
          </View>
        </View>
        {isEmpty && (
          <View style={{ marginTop: "10%", alignItems: "center" }}>
            <Text>Por ahora no tienes ningun viaje</Text>
          </View>
        )}
      </View>
    </>
  );
}
