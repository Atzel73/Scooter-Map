import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator, Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../../../components/Modal/Modal";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { db } from "../../../db/conection";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import firebaseAuth from "../../../db/conection";
const Drawer = createDrawerNavigator();

function DrawerScreen(props) {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [onLoad, setOnLoad] = useState(false);
  const [dontExist, setDontExist] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            //setUserData(docSnap.data());
            onSnapshot(userRef, (doc) => {
              setUserData(doc.data());
              setDontExist(false);
            });
          } else {
            console.log("El usuario no existe");
            setDontExist(true);
          }
        } catch (error) {
          console.log("Error al obtener los datos del usuario: ", error);
        }
      } else {
        console.log("No hay usuario actualmente autenticado");
        //Si es un objeto, aqui se valida
        //console.log("homescreen: ", Object.keys(userData).length === 0);
        //setUserData(null);
        setDontExist(true);
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

      {auth && auth.currentUser && auth.currentUser.uid  ? (
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
  const [userData, setUserData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={[modalVisible ? styles.containerHide : styles.container]}>
      <View>
        <Text>Aqui va un mapa, y parece que un modal. </Text>
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
      <CustomModal toggleModal={toggleModal} modalVisible={modalVisible} />
    </View>
  );
}

export default function HomeScreen() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerScreen {...props} />}
      initialRouteName="Perfil"
    >
      <Drawer.Screen name="Inicio" component={HomeScreenSecond} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
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
