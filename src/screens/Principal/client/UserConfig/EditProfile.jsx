import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
} from "react-native";
import {
  FontAwesome6,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import CustomInput from "../../../../components/TextInput/textInput";
import { useNavigation } from "@react-navigation/native";
import app, { db } from "../../../../db/conection";
import { getAuth } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import CustomImage from "../../../../components/Image/Image";
import Funcionalidades from "../../../../functions/funcionalidades/functionsUser";
const { width, height } = Dimensions.get("window");

export default function EditProfile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const [showName, setShowName] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [load, setOnLoad] = useState(false);
  function useStatesUser() {
    const handlerName = () => setShowName(!showName);
    const handlerPhone = () => setShowPhone(!showPhone);
    const handlerEmail = () => setShowEmail(!showEmail);
    return {
      handlerName,
      handlerPhone,
      handlerEmail,
    };
  }
  useEffect(() => {
    setOnLoad(true);
    try {
      async function getUser() {
        const userRef = doc(db, "users", auth.currentUser.uid);
        onSnapshot(userRef, (doc) => {
          setUserData({ id: doc.id, data: doc.data() });
        });
        // const docSnap = await getDoc(userRef);
        // if (docSnap.exists()) {
        //   setUserData({ id: docSnap.id, data: docSnap.data() });
        // } else {
        //   console.log("El usuario no existe");
        // }
      }
      getUser();
    } catch (error) {
      console.log("Error: ", error);
    }
    setOnLoad(false);
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Editar perfil",
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

  if (Object.keys(userData).length === 0) {
    return (
      <View style={{ alignItems: "center", marginTop: "50%" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  const { handlerName, handlerPhone, handlerEmail } = useStatesUser();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {Object.keys(userData.data).length === 0 ? (
        <View style={{ alignItems: "center", marginTop: "10%" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          <View style={styles.viewHead}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cambiar foto", { user: userData })
              }
            >
              <Image
                style={styles.img}
                source={{ uri: userData.data && userData.data.photo }}
              />
            </TouchableOpacity>

            <Text>Informacion personal</Text>
          </View>

          <View style={styles.contView}>
            <TouchableOpacity
              style={styles.viewField}
              onPress={() => handlerName()}
            >
              <FontAwesome6
                name="circle-user"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>
                {userData.data && userData.data.name}
              </Text>
              <FontAwesome6
                name="chevron-right"
                size={24}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
            {showName && (
              <View style={[styles.contView, { marginHorizontal: 10 }]}>
                <Text style={styles.textTitle}>Actualiza tu nombre</Text>
                <CustomInput
                  value={userData.data && userData.data.name}
                  onChangeText={(text) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      data: {
                        ...prevState.data,
                        name: text,
                      },
                    }))
                  }
                  placeholderTextColor="black"
                  placeholder="nombre"
                  style={{
                    width: "100%",
                    paddingHorizontal: "45%",
                    marginHorizontal: 10,
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.contView}>
            <TouchableOpacity
              style={styles.viewField}
              onPress={() => handlerPhone()}
            >
              <FontAwesome6
                name="phone"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>
                {userData.data && userData.data.phone}
              </Text>
              <FontAwesome6
                name="chevron-right"
                size={24}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
            {showPhone && (
              <View style={[styles.contView, { marginHorizontal: 10 }]}>
                <Text style={styles.textTitle}>
                  Actualizar numero de telefono
                </Text>
                <CustomInput
                  keyboardType="numeric"
                  value={userData.data.phone}
                  onChangeText={(text) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      data: {
                        ...prevState.data,
                        phone: text,
                      },
                    }))
                  }
                  placeholderTextColor="black"
                  placeholder="Nuevo numero de telefono"
                  style={{
                    width: "100%",
                    paddingHorizontal: "45%",
                    marginHorizontal: 10,
                  }}
                >
                  {userData.data && userData.data.phone}
                </CustomInput>
              </View>
            )}
          </View>
          <View style={styles.contView}>
            <TouchableOpacity
              style={styles.viewField}
              onPress={() => handlerEmail()}
            >
              <MaterialCommunityIcons
                name="email-multiple"
                size={24}
                color="black"
                style={styles.Icon}
              />
              <Text style={styles.buttonText}>
                {userData.data && userData.data.email}
              </Text>
              <FontAwesome6
                name="chevron-right"
                size={24}
                color="black"
                style={styles.Icon}
              />
            </TouchableOpacity>
            {showEmail && (
              <View style={[styles.contView, { marginHorizontal: 10 }]}>
                <Text style={styles.textTitle}>
                  Actualiza tu correo electronico
                </Text>
                <CustomInput
                  value={userData.data.email}
                  onChangeText={(text) =>
                    setUserData((prevState) => ({
                      ...prevState,
                      data: {
                        ...prevState.data,
                        email: text,
                      },
                    }))
                  }
                  keyboardType="email-address"
                  placeholderTextColor="black"
                  placeholder="Nuevo correo electronico"
                  style={{
                    width: "100%",
                    paddingHorizontal: "45%",
                    marginHorizontal: 10,
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.contView}>
            <Funcionalidades
              callFunction="UpdateUser"
              userUpdate={userData}
              style={styles.button}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Guardar
              </Text>
            </Funcionalidades>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  buttonText: {
    width: "95%",
    fontSize: 16,
    marginLeft: 10,
  },
  contView: {
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  viewHead: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -300,
    margin: "10%",
    padding: "10%",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
  },
  viewField: {
    marginHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    marginBottom: 10,
    width: "95%",
    minWidth: 350,
  },
});
