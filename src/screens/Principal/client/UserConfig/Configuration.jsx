import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { db } from "../../../../db/conection";
import {
  getAuth,
  signOut,
  linkWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithCredential,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import CustomImage from "../../../../components/Image/Image";
import CustomAwesome from "../../../../components/AwesomeAlert";
import * as Google from "expo-auth-session/providers/google";
const { width, height } = Dimensions.get("window");

export default function Configuration({ route }) {
  const userName = route.params.user.name;
  const navigation = useNavigation();
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(true);
  const [userData, setUserData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    selectAccount: true,
    clientId:
      "857598140703-mhi55jmtd7blc2je2innkmil8607lqmt.apps.googleusercontent.com",
    iosClientId:
      "857598140703-jgmo8bar5psptnnqhb5uv4lc1skas1hl.apps.googleusercontent.com",
    androidClientId:
      "857598140703-cjer1r18grdqhrsln0g1fkcu6tjitntc.apps.googleusercontent.com",
  });

  const [user, setUser] = useState(null);
  const [errorSign, setErrorSign] = useState(false);
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const { accessToken } = authentication;

      fetchUserInfo(accessToken);

      const credentials = GoogleAuthProvider.credential(
        response.params.id_token
      );
      linkUserWithGoogle(credentials);
    }
  }, [response]);

  async function fetchUserInfo(accessToken) {
    console.log("Fetching user info...");
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = await res.json();
    setUser(userInfo);
    console.log("User: ", userInfo);
    // Aquí puedes agregar el registro con Google si es necesario
    // registerWithGoogle(userInfo);
  }

  async function linkUserWithGoogle(credentials) {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is currently logged in.");
      return;
    }

    try {
      // Vincula la cuenta actual con la cuenta de Google
      const linkedUser = await linkWithCredential(user, credentials);
      console.log("User successfully linked:", linkedUser);

      // Actualiza el correo electrónico y la foto de perfil del usuario con los datos de la cuenta de Google
      const googleUser = linkedUser.user;

      // Actualiza el correo del usuario actual al correo de Google
      if (user.email !== googleUser.email) {
        await updateEmail(user, googleUser.email);
        console.log("Email updated to Google email:", googleUser.email);
      }

      // Actualiza la foto de perfil
      await updateProfile(user, {
        photoURL: googleUser.photoURL,
      });
      console.log(
        "Profile photo updated to Google profile picture:",
        user.photoURL
      );
    } catch (error) {
      if (error.code === "auth/credential-already-in-use") {
        console.log(
          "La cuenta de Google ya está en uso. Iniciando sesión con la cuenta existente..."
        );
        Alert.alert("Error. Ya existe esa cuenta de Google.");

        // Si ya existe la cuenta, puedes actualizar los datos si es necesario.
        const existingUser = await signInWithCredential(auth, credentials);
        console.log("Iniciado sesión con el usuario existente:", existingUser);

        // Actualiza el correo del usuario existente
        if (existingUser.user.email !== user.email) {
          await updateEmail(user, existingUser.user.email);
          console.log(
            "Email updated to Google email:",
            existingUser.user.email
          );
        }

        // Actualiza la foto de perfil del usuario existente
        await updateProfile(existingUser.user, {
          photoURL: existingUser.user.photoURL,
        });
        console.log(
          "Profile photo updated to Google profile picture:",
          existingUser.user.photoURL
        );
      } else {
        console.error("Error linking accounts:", error);
        setErrorSign(true);
      }
    }
  }

  const provider = new GoogleAuthProvider();

  function reLinkingUser() {
    linkWithPopup(auth.currentUser, provider)
      .then((result) => {
        // Accounts successfully linked.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log("User: ", user);
      })
      .catch((error) => {
        console.log("Error: ");
      });
  }
  if (errorSign) {
    alert("Error. Ya existe esa cuenta de Google. ");
  }
  useEffect(() => {
    async function getUser() {
      const userRef = doc(db, "users", auth.currentUser.uid);
      onSnapshot(userRef, (doc) => {
        setUserData(doc.data());
      });
    }
    getUser();
  }, []);
  const handleAwesome = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesion cerrada.");
        //alert("¡Sesion cerrada!");
        handleAwesome("Sesion cerrada", "¡Sesion cerrada!");
        setTimeout(() => {
          navigation.navigate("Principal");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function userInfo() {
    const user = auth.currentUser;
    if (!user !== null) {
      console.log("User: ", user.providerData);
    }
  }
  return (
    <>
      <View style={styles.container}>
        {showAlert && (
          <CustomAwesome
            title={alertTitle}
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
        <ScrollView
          persistentScrollbar={false}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.scrollContainer}
          endFillColor="#6BB8FF"
        >
          {auth && auth.currentUser && auth.currentUser.uid ? (
            <View style={styles.subContainer}>
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
              <View style={styles.viewPhoto}>
                {!userData.photo ? (
                  <View>
                    <ActivityIndicator color="#202020" size="large" />
                  </View>
                ) : (
                  <View>
                    <Image
                      source={{ uri: userData.photo }}
                      style={styles.img}
                    />
                  </View>
                )}
                <View>
                  <Text style={{ color: "black" }}> {userData.name}</Text>
                </View>
              </View>
              <View style={styles.viewButtons}>
                <View style={styles.viewInfo}>
                  <View style={styles.contView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => navigation.navigate("EditProfile")}
                    >
                      <FontAwesome6
                        name="circle-user"
                        size={24}
                        color="black"
                        style={styles.Icon}
                      />
                      <Text style={styles.buttonText}>
                        Información personal
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={30}
                        color="black"
                        style={styles.Icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.contView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => promptAsync()}
                    >
                      <MaterialIcons
                        name="security"
                        size={24}
                        color="black"
                        style={styles.Icon}
                      />
                      <Text style={styles.buttonText}>Seguridad</Text>
                      <Ionicons
                        name="chevron-forward"
                        size={30}
                        color="black"
                        style={styles.Icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.viewLugares}>
                <Text>Lugares</Text>
              </View>
              <View style={styles.viewLogout}>
                <View style={styles.contView}>
                  <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={handleLogOut}
                  >
                    <MaterialIcons
                      name="logout"
                      size={34}
                      color="black"
                      style={styles.IconLogout}
                    />
                    <Text style={styles.buttonTextLogout}>Cerrar sesión</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contView}>
                  <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={() => navigation.navigate("Borrar Cuenta")}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={34}
                      color="black"
                      style={styles.IconLogout}
                    />
                    <Text style={styles.buttonTextLogout}>
                      Eliminar cuenta{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <View style={styles.viewBottom} /> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Text style={{ color: "#6BB8FF", fontSize: 18 }}>
                Has cerrado sesion
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewBottom: {
    backgroundColor: "#6BB8FF",
    height: 100,
    width: "50%",
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    position: "relative",
  },
  buttonFloat: {
    position: "absolute",
    top: -5,
    left: 9,
    zIndex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    //elevation: 5,
    //shadowColor: "#202020",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
    paddingBottom: -50,
  },
  viewLugares: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  viewPhoto: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    marginTop: -35,
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    backgroundColor: "white",
    marginBottom: 10,
  },

  viewButtons: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },

  viewLogout: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: -10,
  },
  viewInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  IconLogout: {
    marginLeft: 100,
    marginRight: -100,
  },
  contView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  subContainer: {
    flex: 1,
    //marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHead: {
    marginBottom: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: "#202020",
    marginBottom: 10,
    width: "100%",
    minWidth: "90%",
  },
  buttonLogout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    width: "100%",
    minWidth: "90%",
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  buttonTextLogout: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});
