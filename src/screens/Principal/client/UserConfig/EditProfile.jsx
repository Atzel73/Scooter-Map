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
} from "react-native";
import {
  FontAwesome6,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import CustomInput from "../../../../components/TextInput/textInput";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function EditProfile() {
  const navigation = useNavigation();
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState({});
  const [showName, setShowName] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

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

  const { handlerName, handlerPhone, handlerEmail } = useStatesUser();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.viewHead}>
        <TouchableOpacity>
          <FontAwesome6
            name="circle-user"
            size={60}
            color="black"
            style={[styles.Icon, { margin: "10%" }]}
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
          <Text style={styles.buttonText}>Marco Vazquez</Text>
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
          <Text style={styles.buttonText}>+52161812314561245</Text>
          <FontAwesome6
            name="chevron-right"
            size={24}
            color="black"
            style={styles.Icon}
          />
        </TouchableOpacity>
        {showPhone && (
          <View style={[styles.contView, { marginHorizontal: 10 }]}>
            <Text style={styles.textTitle}>Actualizar numero de telefono</Text>
            <CustomInput
              keyboardType="numeric"
              placeholderTextColor="black"
              placeholder="Nuevo numero de telefono"
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
          onPress={() => handlerEmail()}
        >
          <FontAwesome6
            name="phone"
            size={24}
            color="black"
            style={styles.Icon}
          />
          <Text style={styles.buttonText}>
            KuberIlustracionDigital@gmail.com
          </Text>
          <MaterialCommunityIcons
            name="email-multiple"
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
        <TouchableOpacity
          //onPress={() => navigation.goBack()}
          style={styles.button}
        >
          {/* <FontAwesome6
            name="chevron-left"
            size={24}
            color="black"
            style={styles.Icon}
          /> */}
          <Text style={{ alignSelf: "center", fontSize: 18, fontStyle: 'italic' }}>Guardar </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
