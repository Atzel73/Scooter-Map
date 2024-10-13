import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../../db/conection";
import AwesomeAlert from "react-native-awesome-alerts";
//webID = 857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com
//ios = 857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com
//android = 857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com
WebBrowser.maybeCompleteAuthSession();

export default function PantallaMapa() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [credential, setCredential] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
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
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    setUser(userInfo);
    console.log("User: ", userInfo);
    //registerWithGoogle(userInfo);
  }
  const registerWithGoogle = async (user) => {
    signInWithCredential(auth, credential)
      .then(() => {
        const docRef = doc(db, "users", `${auth.currentUser.uid}`);
        getDoc(docRef).then((document) => {
          if (!document.exists()) {
            setDoc(doc(db, "users", `${auth.currentUser.uid}`), {
              name: user.name,
              rol: "usuario",
              url_photo: user.picture,
              estatus: "Activo",
              email: user.email,
              created_at: new Date(),
            });
          }
        });
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [showAlert, setShowAlert] = useState(false);
  const handleAlert = () => setShowAlert(!showAlert);
  return (
    <View style={styles.container}>
      <Text>Pantalla Mapa</Text>
      <TouchableOpacity onPress={handleAlert}>
        <Text>Activar alerta</Text>
      </TouchableOpacity>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={handleAlert}
        onConfirmPressed={handleAlert}
      />
      {/* {!user ? (
        <TouchableOpacity
          style={{ borderWidth: 1, borderRadius: 10 }}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={{ color: "blue" }}>Login</Text>
        </TouchableOpacity>
      ) : (
        <View>
          {user?.picture && (
            <Image
              source={{ uri: user?.picture }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Text>Usuario: {user.name}</Text>
          <Text>Correo: {user.verified_email} </Text>
        </View>
      )} */}
    </View>
  );
}
