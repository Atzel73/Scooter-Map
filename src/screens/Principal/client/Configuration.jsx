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
} from "react-native";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { db } from "../../../db/conection";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
  console.log("Route: ", route);
  const navigation = useNavigation();
  const auth = getAuth();
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Configuración de la cuenta",
      headerLeft: () => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            //style={{ marginLeft: 10 }}
          >
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="black"
              style={styles.Icon}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesion cerrada.");
        alert("¡Sesion cerrada!")
        navigation.navigate("Principal")
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {auth && auth.currentUser && auth.currentUser.uid ? (
          <View style={styles.subContainer}>
            {/* <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>
                Configuración de la cuenta
              </Text>
            </View> */}
            <View style={styles.viewPhoto}>
              <View>
                <TouchableOpacity>
                  <FontAwesome6
                    name="circle-user"
                    size={60}
                    color="black"
                    style={[styles.Icon, { margin: "10%" }]}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text>Marco</Text>
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
                    <Text style={styles.buttonText}>Información personal</Text>
                    <FontAwesome6
                      name="chevron-right"
                      size={24}
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
                    <FontAwesome6
                      name="chevron-right"
                      size={24}
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
                <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                  <MaterialIcons
                    name="logout"
                    size={34}
                    color="black"
                    style={styles.Icon}
                  />
                  <Text style={styles.buttonText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contView}>
                <TouchableOpacity style={styles.button}>
                  <MaterialIcons
                    name="delete-forever"
                    size={34}
                    color="black"
                    style={styles.Icon}
                  />
                  <Text style={styles.buttonText}>Eliminar cuenta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text>Por favor, inicia sesión</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  viewLugares: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "95%", // Ajustado a un porcentaje mayor
    minWidth: "100%", // Añadido para establecer un ancho mínimo
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  viewPhoto: {
    marginHorizontal: "1%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    padding: 20,
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 10,
  },
  viewButtons: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  viewLogout: {
    alignItems: "center",
    justifyContent: "center",
    height: width / 2,
    width: "100%", // Ajustado a un porcentaje mayor
    minWidth: "100%", // Añadido para establecer un ancho mínimo
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 10,
  },
  viewInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: "white",
  },
  subContainer: {
    flex: 1,
    margin: 20,
    marginTop: "10%",
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
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
    marginBottom: 10,
    width: "100%", // Ajustado para ocupar todo el contenedor
    minWidth: "90%", // Añadido para establecer un ancho mínimo
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});
