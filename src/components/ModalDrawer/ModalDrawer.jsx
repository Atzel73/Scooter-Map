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
  Entypo,
} from "@expo/vector-icons";
import { db } from "../../db/conection";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

import styles from "../Modal/styles";

export default function ModalDrawer({ modalVisible, toggleModal }) {
  const auth = getAuth();

  const [userData, setUserData] = useState(null);
  const [loading, isLoading] = useState(false);
  const [dontExist, setDontExist] = useState(false);
  const [error, setIsError] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          isLoading(true);
          const userRef = doc(db, "users", user.uid);

          let docSnap = await getDoc(userRef);

          if (!docSnap.exists()) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            docSnap = await getDoc(userRef);
          }

          if (!docSnap.exists()) {
            console.log("El usuario no existe");
            setDontExist(true);
            //setIsError(true);
            isLoading(false);
          } else {
            onSnapshot(userRef, (doc) => {
              setUserData(doc.data());
              setDontExist(false);
              setIsError(false);
              isLoading(false);
            });
          }
        } catch (error) {
          console.log("Error al obtener los datos del usuario: ", error);
          setIsError(true);
        }
      } else {
        console.log("No hay usuario");
      }
    });

    return () => unsubscribe();
  }, [auth]);
  if (loading) {
    return (
      <View style={{ marginTop: "50%", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6BB8FF" />
        <Text>Cargando, por favor espere</Text>
      </View>
    );
  }
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
                          <Entypo name="star" size={24} color="#4772A9" />
                          <Entypo name="star" size={24} color="#4772A9" />
                          <Entypo name="star" size={24} color="#4772A9" />
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
                <TouchableOpacity
                  style={styles.extraButton}
                  onPress={() => {
                    navigation.navigate("AcercaDe"), toggleModal();
                  }}
                >
                  {/* <MaterialIcons
                    name="warning-amber"
                    size={24}
                    color="black"
                    style={styles.Icon}
                  /> */}
                  <Image
                    source={require("../../../assets/Icons/About.png")}
                    style={[styles.Icon, { height: 30, width: 30 }]}
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
