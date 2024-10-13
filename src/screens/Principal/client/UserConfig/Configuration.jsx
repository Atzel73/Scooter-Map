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
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import CustomImage from "../../../../components/Image/Image";
import CustomAwesome from "../../../../components/AwesomeAlert";
const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

function DrawerScreen(props) {
  const [isLogged, setIsLogged] = useState(false);
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      {!isLogged && (
        <>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>En espera 1</Text>
              <FontAwesome6
                name="hospital-user"
                size={24}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>En espera 2</Text>
              <FontAwesome6
                name="hospital-user"
                size={24}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </DrawerContentScrollView>
  );
}

export default function Configuration({ route }) {
  const userName = route.params.user.name;
  const navigation = useNavigation();
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(true);
  const [userData, setUserData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
  function userInfo(){
    const user = auth.currentUser;
    if(!user !==null){
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
                    <TouchableOpacity style={styles.button}>
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
