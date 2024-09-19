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
const { width, height } = Dimensions.get("window");
export default function LoginWithFacebook() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  return (
    <View style={styles.viewButtons}>
      <View style={styles.viewInfo}>
        <View style={styles.contView}>
          <TouchableOpacity style={styles.button}>
            <FontAwesome6
              name="facebook"
              size={24}
              color="black"
              style={styles.Icon}
            />
            <Text style={styles.buttonText}>Continua con Facebook</Text>
            <Text style={styles.googleText}>Vincular</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  viewButtons: {
    alignItems: "left",
    justifyContent: "left",
    // height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
   // marginRight: 50

  },
  viewInfo: {
    alignItems: "left",
    justifyContent: "left",
  },
  googleText: {
    color: "#6BB8FF",
    marginLeft: 10,
  },
  viewButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: "#202020",
    width: "100%",
    minWidth: "90%",
  },
  Icon: {
    marginLeft: 15,
    marginRight: -80,
  },
  viewInter: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});
