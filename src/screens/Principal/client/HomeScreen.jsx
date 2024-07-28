import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
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

const Drawer = createDrawerNavigator();

function DrawerScreen(props) {
  const [isLogged, setIsLogged] = useState(false);
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Tutorial"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
      {!isLogged && (
        <View style={{ margin: "5%" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Configurar Perfil")}
            style={styles.viewUser}
          >
            <Image
              source={{
                uri: "https://userscontent2.emaze.com/images/b228cb3d-f05e-4d8c-9943-8af0baf0ebc4/01f2c3075f24988c95d277dda08f656d.png",
              }}
              style={styles.image}
            />
            <Text>Nombre estatico</Text>
          </TouchableOpacity>
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
      )}
    </DrawerContentScrollView>
  );
}

function HomeScreenSecond() {
  const [isLogged, setIsLogged] = useState(false);
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
