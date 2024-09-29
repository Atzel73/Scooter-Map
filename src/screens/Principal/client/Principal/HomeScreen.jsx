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
import ModalLogin from "../../../../components/ModalLogin/ModalLogin";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const ButtonsFloats = ({ setModalVisible, modalVisible }) => {
  return (
    <>
      <View style={styles.drawerButton}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <FontAwesome6 name="grip-lines" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.drawerButtonLoc}>
        <TouchableOpacity>
          <FontAwesome6 name="location-arrow" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function HomeScreen() {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [dontExist, setDontExist] = useState(false);
  const [error, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
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
            setIsError(true);
          } else {
            onSnapshot(userRef, (doc) => {
              setUserData(doc.data());
              // setModalVisibleLogin(false);
              setDontExist(false);
            });
          }
        } catch (error) {
          console.log("Error al obtener los datos del usuario: ", error);
          setIsError(true);
        }
      } else {
        // setModalVisibleLogin(true);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  }, []);

  if (error) {
    return (
      <View style={{ marginTop: "50%", alignItems: "center" }}>
        <Text>
          Ha habido un error al traer los datos del usuario. Por favor reinicia
          la aplicacion, si el problema persiste, contacta a los desarrolladores
        </Text>
      </View>
    );
  }

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModalLogin = () => setModalVisibleLogin(!modalVisibleLogin);

  return (
    <View style={styles.container}>
      {modalVisibleLogin && (
        <View style={styles.modalOverlay}>
          <ModalLogin
            modalVisibleLogin={modalVisibleLogin}
            toggleModalLogin={toggleModalLogin}
          />
        </View>
      )}

      <ModalDrawer modalVisible={modalVisible} toggleModal={toggleModal} />
      <ButtonsFloats
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <View>{/* <PantallaMapa /> */}</View>
    </View>
  );
}
