import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
                style={{ marginLeft: 10 }}
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
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </DrawerContentScrollView>
  );
}

export default function Configuration() {
  const navigation = useNavigation();
  const [isLogged, setIsLogged] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.subContainer}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Configuración de la cuenta</Text>
        </View>

        <View style={styles.contView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.buttonText}>Editar perfil</Text>
            <FontAwesome6
              name="hospital-user"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        {isLogged && (
          <>
            <View style={styles.contView}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>En espera 1</Text>
                <FontAwesome6
                  name="hospital-user"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
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
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

// export default function Configuration() {
//   const [isLogged, setIsLogged] = useState(false);
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <DrawerScreen {...props} />}
//       initialRouteName="Configuration"
//     >
//       <Drawer.Screen
//         name="Configuration"
//         component={ConfigurationScreen}
//         options={{ headerShown: false }}
//       />
//     </Drawer.Navigator>
//   );
// }

const styles = StyleSheet.create({
  contView: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  subContainer: {
    flex: 1,
    margin: 20,
    marginTop: "10%",
    alignItems: "center",
  },
  sectionHead: {
    marginBottom: 20,
    marginVertical: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  sectionText: {
    fontSize: 16,
    textAlign: "left",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
  },
});
