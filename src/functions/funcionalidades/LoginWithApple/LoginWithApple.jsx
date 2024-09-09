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
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { FontAwesome6, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function LoginWithApple() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <View style={styles.viewInter}>
          <AntDesign
            name="apple1"
            size={24}
            color="black"
            style={styles.Icon}
          />
        </View>
        <View style={styles.viewInter}>
          <Text>Continua con Apple</Text>
        </View>
        <View style={styles.viewInter}>
          <Text style={styles.googleText}>Vincular</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  googleText: {
    color: "#6BB8FF",
    marginLeft: 10
  },
  viewButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
  },
  Icon: {
    marginLeft: 15,
    marginRight: 15
  },
  viewInter: {
    margin: 15,
    marginHorizontal: 10,
    alignItems: "flex-start",
    flexWrap: "wrap"

  },
});

