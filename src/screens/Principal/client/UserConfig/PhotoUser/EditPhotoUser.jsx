import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import CustomImage from "../../../../../components/Image/Image";
import styles from "./styles";
import pickImage from "../../../../../functions/cameraPicker/imagePicker";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../../../db/conection";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import CustomActivity from "../../../../../components/Indicator/CustomActivity";
import { imageToBlob } from "../../../../../functions/imageBlob/imageBlob";
import AwesomeAlert from "react-native-awesome-alerts";

export default function EditPhoto({ route }) {
  const navigation = useNavigation();
  const auth = getAuth();
  const [image, setImage] = useState(null);
  const [success, setIsSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const newImage = async () => {
    setLoading(true);
    try {
      let result = await pickImage(); 
      if (result) {
        console.log("Imagen URL: ", result);
        setImage(result); 

        await updateDoc(doc(db, "users", route.params.user.id), {
          photo: result, 
        });

        //Alert.alert("Imagen actualizada");
        setIsSuccess(true);
        setShowAlert(true);
        setLoading(false);
        navigation.goBack();
      }
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
  if (success) {
    return (
      <View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="¡Finalizado!"
          message="Foto de perfil actualizada"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          progressColor="#6BB8FF"
          progressSize="large"
        />
      </View>
    );
  }
  if(loading){
    return(
      <View>
        <CustomActivity size={100} color="#202020" />
      </View>
    )
  }
  return (
    <View style={styles.mainView}>
      {!image ? (
        <View>
          <ActivityIndicator color="#202020" size="large" />
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
