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
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { FontAwesome6, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import * as Facebook from "expo-auth-session/providers/facebook";
import { db } from "../../../db/conection";
WebBrowser.maybeCompleteAuthSession();
export default function LoginWithFacebook() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const empty =
    "https://firebasestorage.googleapis.com/v0/b/floydapp-a1e0d.appspot.com/o/Admin%2FuserEmpty.jpg?alt=media&token=19d2651d-f14e-4ae7-8629-489f512bfc78";
  const provider = new FacebookAuthProvider();
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${data.accessToken}&fields=id,name,picture.type(large)`
      );
      const userInfo = await userInfoResponse.json();
      // Create a Firebase credential with the AccessToken
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );

      //console.log("Login: ", facebookCredential);
      console.log("Data edit: ", data.accessToken);
      console.log("userInfo: ", userInfo);
      signInWithCredential(auth, facebookCredential)
        .then(() => {
          //Alert.alert("Iniciando Sesion", "Accediendo");
          const docRef = doc(db, "users", `${auth.currentUser.uid}`);
          onSnapshot(docRef, (document) => {
            if (!document.exists()) {
              setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
                name: userInfo.name,
                last_name: "",
                rol: "usuario",
                url_photo:
                  userInfo.picture.data.url === null
                    ? empty
                    : userInfo.picture.data.url,
                status: "Activo",
                created_at: new Date(),
                scooter_id: "",
                verify_by_facebook: true,
              });
              console.log("Usuario creado");
              navigation.navigate("Principal");
            } else {
              navigation.navigate("Principal");
              alert("Bienvenido");
            }
          });
        })
        .catch((error) => {
          Alert.alert("Error", "Usuario o contraseña incorrectos");
          console.log(error);
        });
    } catch (error) {
      console.log("Error en facebook: ", error);
    }
  }

  return (
    <View style={styles.viewButtons}>
      <View style={styles.viewInfo}>
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={onFacebookButtonPress}
          >
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
    borderBottomWidth: 1,
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
