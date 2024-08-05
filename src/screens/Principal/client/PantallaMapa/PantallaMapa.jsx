import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
export default function PantallaMapa() {
  const [userInfo, setuserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com",
    androidClientId:
      "857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com",
    webClientId:
      "857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSigninWithGoogle();
  }, [response]);
  async function handleSigninWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
        console.log("User: ", userInfo);
      }
    } else {
      setuserInfo(user);
    }
  }
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setuserInfo(user);
      console.log("User: ", userInfo);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //webID = 857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com
  //ios = 857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com
  //android = 857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com
  return (
    <View style={styles.container}>
      <Text>Pantalla Mapa</Text>
      {!userInfo ? (
        <TouchableOpacity
          disabled={!request}
          style={{ borderWidth: 1, borderRadius: 10 }}
          onPress={() => {
            promptAsync();
            console.log("user: ", userInfo);
          }}
        >
          <Text style={{ color: "blue" }}>Login</Text>
        </TouchableOpacity>
      ) : (
        <View>
          {userInfo?.picture && (
            <Image
              source={{ uri: userInfo?.picture }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Text>Usuario: {userInfo.name}</Text>
          <Text>Correo: {userInfo.verified_email} </Text>
        </View>
      )}
    </View>
  );
}
