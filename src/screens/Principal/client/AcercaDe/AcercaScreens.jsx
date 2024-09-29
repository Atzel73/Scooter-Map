import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  FontAwesome6,
  MaterialIcons,
  AntDesign,
  Ionicons,
  Entypo,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
export default function AcercaScreens() {
  const navigation = useNavigation();
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
            <Text style={styles.textTitle}>Acerca de</Text>
          </View>
        </View>
        <View style={styles.viewButtons}>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity style={styles.buttonView}>
              <Entypo
                name="star"
                size={30}
                color="#6BB8FF"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Valora nuestra app</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity style={styles.buttonView}>
              <AntDesign
                name="like1"
                size={30}
                color="#6BB8FF"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Regala un like en instagram</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity style={styles.buttonView}>
              <FontAwesome
                name="phone"
                size={30}
                color="#6BB8FF"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Contactos</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity style={styles.buttonView}>
              <Octicons
                name="law"
                size={30}
                color="#6BB8FF"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Legal</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <TouchableOpacity style={styles.buttonView}>
              <FontAwesome
                name="file"
                size={30}
                color="#6BB8FF"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Privacidad</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
