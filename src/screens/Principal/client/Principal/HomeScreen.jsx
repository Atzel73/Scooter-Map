import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  Alert, useWindowDimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../../../../components/Modal/Modal";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { db } from "../../../../db/conection";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import firebaseAuth from "../../../../db/conection";
import PantallaMapa from "../PantallaMapa";
const Drawer = createDrawerNavigator();

function DrawerScreen(props) {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [onLoad, setOnLoad] = useState(false);
  const [dontExist, setDontExist] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);

          let docSnap = await getDoc(userRef);

          if (!docSnap.exists()) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            docSnap = await getDoc(userRef);
          }

          if (!docSnap.exists()) {
            console.log("El usuario no existe");
            setDontExist(true);
          } else {
            onSnapshot(userRef, (doc) => {
              setUserData(doc.data());
              setDontExist(false);
            });
          }
        } catch (error) {
          console.log("Error al obtener los datos del usuario: ", error);
        }
      } else {
        console.log("No hay usuario");
      }
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Tutorial"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />

      {auth && auth.currentUser && auth.currentUser.uid ? (
        <View style={{ margin: "5%" }}>
          {auth && auth.currentUser && userData && userData.name ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Configurar Perfil", {
                  screen: "Config",
                  params: { user: userData },
                })
              }
              style={styles.viewUser}
            >
              <Image
                source={{
                  uri: userData.photo,
                }}
                style={styles.image}
              />
              <Text>{userData.name}</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )}

          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <FontAwesome6
                name="money-check-dollar"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Pago</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <FontAwesome6
                name="person-running"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Viajes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons
                name="warning-amber"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Reportes</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons
                name="support-agent"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Soporte</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contView}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons
                name="warning-amber"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>Acerca de</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Iniciar Sesion")}
          >
            <FontAwesome6
              name="money-check-dollar"
              size={24}
              color="black"
              style={styles.Icon}
            />
            <Text style={styles.buttonText}>
              No tienes la sesion iniciada. Inicia sesion.{" "}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
}

function HomeScreenSecond() {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [onLoad, setOnLoad] = useState(false);
  const [dontExist, setDontExist] = useState(false);
  const navigation = useNavigation();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       try {
  //         const userRef = doc(db, "users", user.uid);

  //         let docSnap = await getDoc(userRef);

  //         if (!docSnap.exists()) {
  //           await new Promise((resolve) => setTimeout(resolve, 500));
  //           docSnap = await getDoc(userRef);
  //         }

  //         if (!docSnap.exists()) {
  //           console.log("El usuario no existe");
  //           setDontExist(true);
  //         } else {
  //           onSnapshot(userRef, (doc) => {
  //             setUserData(doc.data());
  //             setDontExist(false);
  //           });
  //         }
  //       } catch (error) {
  //         console.log("Error al obtener los datos del usuario: ", error);
  //       }
  //     } else {
  //       console.log("No hay usuario");
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View
      style={styles.container}
      //  style={[modalVisible ? styles.containerHide : styles.container]}
    >
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            {auth && auth.currentUser && auth.currentUser.uid ? (
              <View style={{ margin: "5%" }}>
                {auth && auth.currentUser && userData && userData.name ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Configurar Perfil", {
                        screen: "Config",
                        params: { user: userData },
                      })
                    }
                    style={styles.viewUser}
                  >
                    <Image
                      source={{
                        uri: userData.photo,
                      }}
                      style={styles.image}
                    />
                    <Text>{userData.name}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                )}

                <View style={styles.contView}>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome6
                      name="money-check-dollar"
                      size={24}
                      color="black"
                      style={styles.Icon}
                    />
                    <Text style={styles.buttonText}>Pago</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contView}>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome6
                      name="person-running"
                      size={24}
                      color="black"
                      style={styles.Icon}
                    />
                    <Text style={styles.buttonText}>Viajes</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contView}>
                  <TouchableOpacity style={styles.button}>
                    <MaterialIcons
                      name="warning-amber"
                      size={24}
                      color="black"
                      style={styles.Icon}
                    />
                    <Text style={styles.buttonText}>Reportes</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contView}>
                  <TouchableOpacity style={styles.button}>
                    <MaterialIcons
                      name="support-agent"
                      size={24}
                      color="black"
                      style={styles.Icon}
                    />
                    <Text style={styles.buttonText}>Soporte</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contView}>
                  <TouchableOpacity style={styles.button}>
                    <MaterialIcons
                      name="warning-amber"
                      size={24}
                      color="black"
                      style={styles.Icon}
                    />
                    <Text style={styles.buttonText}>Acerca de</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.contView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Iniciar Sesion")}
                >
                  <FontAwesome6
                    name="money-check-dollar"
                    size={24}
                    color="black"
                    style={styles.Icon}
                  />
                  <Text style={styles.buttonText}>
                    No tienes la sesion iniciada. Inicia sesion.{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal> */}
      {/* <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text>Abrir drawer</Text>
      </TouchableOpacity> */}
      <View>
        <PantallaMapa />
      </View>
      <View style={styles.contView}>
        <TouchableOpacity style={styles.button} onPress={toggleModal}>
          <Text>Abrir modal</Text>
          <FontAwesome6
            name="folder-open"
            size={24}
            color="black"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
      {/* <CustomModal toggleModal={toggleModal} modalVisible={modalVisible} /> */}
    </View>
  );
}

export default function HomeScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      initialRouteName="Perfil"
      screenOptions={{
        drawerStyle: {
          //backgroundColor: "#c6cbef",
          //width: 240,
        },
        drawerType: 'back',
        drawerActiveTintColor: "#4772A9",
        overlayColor: 'grey',
        
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreenSecond} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    backgroundColor: "#202020",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    borderColor: "#202020",
    marginBottom: 10,
  },
  contView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewUser: {
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    //padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
