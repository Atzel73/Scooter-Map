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
import { db } from "../../db/conection";
export default function LoginWithGoogle() {
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [credential, setCredential] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const empty =
    "https://firebasestorage.googleapis.com/v0/b/floydapp-a1e0d.appspot.com/o/Admin%2FuserEmpty.jpg?alt=media&token=19d2651d-f14e-4ae7-8629-489f512bfc78";
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    clientId:
      "857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com",
    iosClientId:
      "857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com",
    androidClientId:
      "857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
      const credentials = GoogleAuthProvider.credential(
        response.params.id_token
      );
      setCredential(credentials);
    }
  }, [response, accessToken]);
  async function fetchUserInfo() {
    console.log("fetchUserInfo");
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    setUser(userInfo);
    console.log("User: ", userInfo);
    registerWithGoogle(userInfo);
  }
  const registerWithGoogle = async (user) => {
    await signInWithCredential(auth, credential)
      .then(() => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef).then((document) => {
          if (!document.exists()) {
            setDoc(doc(db, "users", auth.currentUser.uid), {
              name: user.given_name,
              last_name: user.family_name,
              rol: "usuario",
              photo: !user.picture ? empty : user.picture,
              password: user.given_name,
              scooter_id: "",
              status: "Activo",
              email: user.email,
              created_at: new Date(),
              users_blocked: [],
              blocked_by: [],
              verifyByFacebook: true,
            });
          }
        });
      })
      .then(() => {
        Alert.alert("¡Bienvenido!");
        navigation.navigate("Principal");
        console.log("Registrado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <View>
    //   <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
    //     <View style={styles.viewInter}>
    //       <AntDesign
    //         name="google"
    //         size={24}
    //         color="black"
    //         style={styles.Icon}
    //       />
    //     </View>
    //     <View style={styles.viewInter}>
    //       <Text>Continua con Google</Text>
    //     </View>
    //     <View style={styles.viewInter}>
    //       <Text style={styles.googleText}>Vincular</Text>
    //     </View>
    //   </TouchableOpacity>
    // </View>

    <View style={styles.viewButtons}>
      <View style={styles.viewInfo}>
        <View style={styles.contView}>
          <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
            <AntDesign
              name="google"
              size={24}
              color="black"
              style={styles.Icon}
            />
            <Text style={styles.buttonText}>Continua con Google</Text>
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
    //height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    marginRight: 50,
  },
  viewInfo: {
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
    marginBottom: 10,
    width: "100%",
    minWidth: "90%",
  },
  Icon: {
    marginLeft: 15,
    marginRight: 15,
  },
  viewInter: {
    margin: 15,
    marginHorizontal: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});
