import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome6,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { db } from "../../db/conection";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import styles from "../Modal/styles";

export default function ModalDrawer({ modalVisible, toggleModal }) {
  const auth = getAuth();

  const [userData, setUserData] = useState(null);
  const [onLoad, setOnLoad] = useState(false);
  const [dontExist, setDontExist] = useState(false);
  const [error, setIsError] = useState(false);

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
  if (error) {
    return (
      <View>
        <Text>Error al traer los datos de usuario</Text>
      </View>
    );
  }
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {auth && auth.currentUser && auth.currentUser.uid ? (
              <>
                {auth && auth.currentUser && userData && userData.name ? (
                  <>
                    <View style={styles.viewUser}>
                      <View>
                        <TouchableOpacity onPress={() => toggleModal()}>
                          <Ionicons
                            name="arrow-back-circle"
                            size={40}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Configurar Perfil", {
                            screen: "Config",
                            params: { user: userData },
                          });
                          toggleModal();
                        }}
                        style={styles.buttonModal}
                      >
                        <View>
                          <Image
                            source={{
                              uri: userData.photo,
                            }}
                            style={styles.image}
                          />
                        </View>

                        <View
                          style={{
                            alignItems: "flex-start",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={styles.modalTitle}>{userData.name}</Text>
                          <Text style={styles.miniText}>Mi perfil</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={styles.viewStars}>
                          <AntDesign name="star" size={24} color="#4772A9" />
                          <AntDesign name="star" size={24} color="#4772A9" />
                          <AntDesign name="star" size={24} color="#4772A9" />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                )}

                <View style={styles.row}>
                  <View style={styles.column}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate("Pagos"), toggleModal();
                      }}
                    >
                      <FontAwesome6
                        name="money-check-dollar"
                        size={24}
                        color="black"
                        style={styles.Icon}
                      />
                      <Text style={styles.buttonText}>Pago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate("Viajes"), toggleModal();
                      }}
                    >
                      <Image
                        source={require("../../../assets/Icons/travels.png")}
                        style={[styles.Icon, { height: 20, width: 20 }]}
                      />
                      <Text style={styles.buttonText}>Viajes</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.column}>
                    <TouchableOpacity style={styles.button}>
                      <Image
                        source={require("../../../assets/Icons/reports.png")}
                        style={[styles.Icon, { height: 30, width: 20 }]}
                      />
                      <Text style={styles.buttonText}>Reportes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        navigation.navigate("Soporte"), toggleModal();
                      }}
                    >
                      <MaterialIcons
                        name="support-agent"
                        size={24}
                        color="black"
                        style={styles.Icon}
                      />
                      <Text style={styles.buttonText}>Soporte</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={styles.extraButton}>
                  <MaterialIcons
                    name="warning-amber"
                    size={24}
                    color="black"
                    style={styles.Icon}
                  />
                  <Text style={styles.buttonText}>Acerca de</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.contViewGuest}>
                <TouchableOpacity
                  style={styles.buttonGuest}
                  onPress={() => {
                    navigation.navigate("Iniciar Sesion");
                    toggleModal();
                  }}
                >
                  <FontAwesome6
                    name="money-check-dollar"
                    size={24}
                    color="black"
                    style={styles.Icon}
                  />
                  <Text style={styles.buttonText}>
                    No hay sesion activa. Inicia sesion o crea una cuenta.
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.viewBottom} />
        </View>
      </Modal>
    </View>
  );
}
