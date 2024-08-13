import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { db } from "../../../db/conection";
import { updateDoc, doc, addDoc, collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

export default function BlockUser({ route }) {
  const navigation = useNavigation();
  const auth = getAuth();
  const [userData, setUserData] = useState({});
  const [userBlocked, setUserBlocked] = useState({});
useEffect(()=>{
  async function GetActualUser() {
    try {
      const userRef = doc(db, "users", route.params.id);
      onSnapshot(userRef, (doc) => {
        setUserBlocked(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  }
  GetActualUser();
},[])
  
  async function bloquearUsuario() {
    try {
      if (!userData) {
        console.log("Cargando...");
        return;
      }

      const actualUser = {
        user_id: route.params.id,
      };

      const blockedBy = {
        user_id: auth.currentUser.uid,
      };

      const newBlocked = userData.users_blocked.concat(actualUser);
      const newBlockedBy = userBlocked.blocked_by.concat(blockedBy);

      //Actualizar usuario logueado
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        users_blocked: newBlocked,
      });

      //Actualizar usuario bloqueado
      await updateDoc(doc(db, "users", route.params.id), {
        blocked_by: newBlockedBy,
      });

      console.log("Usuario bloqueado correctamente");
    } catch (error) {
      console.log("Error al bloquear: ", error);
    }
  }
 
  async function AgregarRandom() {
    try {
      await addDoc(collection(db, "random"), {
        created_by: route.params.id,
        name: "lugar random",
        add_at: new Date(),
        url_photo:
          "https://i.pinimg.com/564x/a1/f8/11/a1f81134bb1b13f2ef0df7c7746af74b.jpg",
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (doc) => {
        setUserData(doc.data());
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.card}>
      {/* <Text style={styles.name}>{route.params.userData.name}</Text> */}
      <Text style={styles.email}></Text>
      <TouchableOpacity style={styles.deleteButton} onPress={bloquearUsuario}>
        <Text style={styles.deleteText}>Bloquear</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={AgregarRandom}>
        <Text style={styles.deleteText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
