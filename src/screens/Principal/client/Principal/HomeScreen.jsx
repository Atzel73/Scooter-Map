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
  Alert,
  useWindowDimensions,
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
import { getDoc, doc, where, collection, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import firebaseAuth from "../../../../db/conection";
import PantallaMapa from "../PantallaMapa";
import ModalDrawer from "../../../../components/ModalDrawer";
import styles from "./styles";
import { get } from "firebase/database";
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
              {/* <Image
                source={{
                  uri: userData.photo,
                }}
                style={styles.image}
              /> */}
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
  const [users, setUsers] = useState([]);
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
            // function getUsers() {
            //   var is_blocked = false;
            //   const q = query(
            //     collection(db, "users"),
            //     where("blocked_by", "not-in", [auth.currentUser.uid])
            //   );
            //   onSnapshot(q, (querySnapshot) => {
            //     const users = [];
            //     querySnapshot.forEach((doc) => {
            //       users.push(doc.data());
            //     });
            //     setUsers(users);
            //   });
            // }
            // getUsers();
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
  useEffect(() => {
    function getAllUsers() {
      const usersRef = collection(db, "users");

      onSnapshot(usersRef, (querySnapshot) => {
        const users = [];

        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          if (doc.id === auth.currentUser.uid) {
            return;
          }

          const userActual = userData.blocked_by?.some(
            (blockedUser) => blockedUser.user_id === auth.currentUser.uid
          );

          const blockedBy = userData.users_blocked?.some(
            (blockedUser) => blockedUser.user_id === auth.currentUser.uid
          );

          if (!userActual && !blockedBy) {
            users.push({ id: doc.id, userData });
          }
        });

        setUsers(users);
      });
    }

    getAllUsers();
  }, []);

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
      <ModalDrawer modalVisible={modalVisible} toggleModal={toggleModal} />

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <FontAwesome6 name="grip-lines" size={30} color="black" />
      </TouchableOpacity>
      <View>
        {/* <PantallaMapa /> */}
        {users &&
          users.map((item, index) => {
            return auth && auth.currentUser && auth.currentUser.uid ? (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 10,
                }}
                onPress={() =>
                  navigation.navigate("Bloquear", {
                    user: item.users,
                    id: item.id,
                  })
                }
              >
                {!item.userData.photo ? (
                  <Text>Cargando...</Text>
                ) : (
                  <Image
                    source={{ uri: item.userData.photo }}
                    style={{ width: 150, height: 150 }}
                  />
                )}

                <Text>{item.userData.name}</Text>
              </TouchableOpacity>
            ) : (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: 10,
                }}
                onPress={() =>
                  navigation.navigate("Bloquear", {
                    user: item.users,
                    id: item.id,
                  })
                }
              >
                {!item.userData.photo ? (
                  <Text>Cargando...</Text>
                ) : (
                  <Image
                    source={{ uri: item.userData.photo }}
                    style={{ width: 150, height: 150 }}
                  />
                )}

                <Text>{item.userData.name}</Text>
              </View>
            );
          })}
      </View>
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
        drawerType: "back",
        drawerActiveTintColor: "#4772A9",
        overlayColor: "grey",
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeScreenSecond} />
    </Drawer.Navigator>
  );
}
