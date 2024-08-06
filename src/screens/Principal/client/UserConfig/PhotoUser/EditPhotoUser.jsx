import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import CustomImage from "../../../../../components/Image/Image";
import styles from "./styles";
import pickImage from "../../../../../functions/cameraPicker/imagePicker";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../../../db/conection";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

import CustomActivity from "../../../../../components/Indicator/CustomActivity";
export default function EditPhoto({ route }) {
  const navigation = useNavigation();
  const auth = getAuth();
  const [image, setImage] = useState(null);

  const newImage = async () => {
    let result = await pickImage();
    setImage(result);
    try {
      updateDoc(doc(db, "users", route.params.user.id), {
        photo: result,
      });
      Alert.alert("Imagen actualizada");
      navigation.goBack();
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={newImage}>
          <View>
            <Text style={styles.text}>Editar</Text>
          </View>
        </TouchableOpacity>
      ),
    });
    const getUser = () => {
      const userRef = doc(db, "users", route.params.user.id);
      onSnapshot(userRef, (doc) => {
        setImage(doc.data());
      });
    };
    getUser();
  }, []);
  return (
    <View style={styles.mainView}>
      {!image ? (
        <View>
          <ActivityIndicator color="#202020" size="large"/>
        </View>
      ) : (
        <CustomImage
          style={styles.img}
          source={{ uri: image && image.photo }}
        />
      )}
    </View>
  );
}
