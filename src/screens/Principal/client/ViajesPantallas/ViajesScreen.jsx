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
  AntDesign,
} from "@expo/vector-icons";
import styles from "./styles";

import ViewLocation from "../../../../components/ViewLocation/ViewLocation";
import CustomBox from "../../../../components/CheckBox";
import ViewLugares from "../../../../components/ViewLugares/ViewLugares";
export default function ViajesScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, isError] = useState(false);

  if (loading) {
    return (
      <View style={{ marginTop: "100%", alignItems: "center" }}>
        <ActivityIndicator color="#6BB8FF" size="large" />
      </View>
    );
  }
  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
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
        <View style={styles.header}>
          <View style={styles.viewHead}>
            <Text style={styles.textTitle}>Mis viajes</Text>
            <Image
              source={require("../../../../../assets/Icons/Rectangle.png")}
              style={[styles.Icon, styles.image]}
            />
            <Image
              source={require("../../../../../assets/Icons/Scooter.png")}
              style={[styles.Icon, { height: 35, width: 70, marginRight: 10 }]}
            />
          </View>
        </View>
        {isEmpty && (
          <View style={{ marginTop: "10%", alignItems: "center" }}>
            <Text>Por ahora no tienes ningun viaje</Text>
          </View>
        )}
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ViewLocation location="Durango, Dgo.mx." />
          <ViewLugares />
        </View>
      </ScrollView>
    </>
  );
}
