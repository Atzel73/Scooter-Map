import { db } from "../../db/conection";
import { getAuth } from "firebase/auth";
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  writeBatch,
  addDoc,
  collection,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
async function CreateCard(data) {
  const auth = getAuth();
  const navigation = useNavigation();
  console.log("Dentro: ", data)
  const CardData = {
    number: data.number,
    cvv: data.cvv,
    type: data.type,
    expiration_date: data.expiration_date,
    country_code: data.country,
    created_at: new Date(),
    user_id: auth.currentUser.uid,
  };
  try {
    const docRef = await addDoc(collection(db, "cards"), CardData);
    console.log("Tarjeta creada");
    navigation.goBack()
  } catch (error) {
    console.log("Error al crear la tarjeta:", error);
  }

}

async function UpdateCard(data) {
  const auth = getAuth();
  await updateDoc(doc(db, "cards", auth.currentUser.uid), data);
  console.log("Tarjeta actualizada");
}
async function DeleteCard(data) {
  const auth = getAuth();
  await deleteDoc(doc(db, "cards", auth.currentUser.uid));
  console.log("Tarjeta eliminada");
}
export { CreateCard, UpdateCard, DeleteCard };
