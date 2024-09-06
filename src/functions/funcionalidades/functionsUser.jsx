import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import app, { db } from "../../db/conection";
import firebaseAuth from "../../db/conection";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  updateEmail,
} from "firebase/auth";
import {
  setDoc,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

export default function Funcionalidades({
  title,
  callFunction,
  data,
  style,
  children,
  user,
  userSign,
  userUpdate,
  userDelete,
  disabled,
}) {
  const auth = getAuth();
  const navigation = useNavigation();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const empty =
    "https://firebasestorage.googleapis.com/v0/b/floydapp-a1e0d.appspot.com/o/Admin%2FuserEmpty.jpg?alt=media&token=19d2651d-f14e-4ae7-8629-489f512bfc78";

  const handlerDisabledButton = () => {};
  async function RegisterUser() {
    console.log("Dentro");
    try {
      const userData = {
        photo: user.image === undefined ? "empty" : user.image,
        name: user.name,
        last_name: user.lastName,
        email: user.email,
        password: user.confirmPassword,
        phone: user.phone,
        status: "Activo",
        rol: "usuario",
        scooter_id: "",
        created_at: new Date(),
      };
      await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.confirmPassword
      )
        .then((userCredentials) => {
          setDoc(doc(db, "users", userCredentials.user.uid), {
            photo: user.image === undefined ? empty : user.image,
            name: "usuario",
            last_name: "usuario",
            email: userCredentials.user.email,
            phone: "",
            password: user.confirmPassword,
            status: "Activo",
            rol: "usuario",
            scooter_id: "",
            created_at: new Date(),
            users_blocked: [],
            blocked_by: [],
          });
          Alert.alert("¡Bienvenido!");
          navigation.navigate("Principal");
          console.log("Registrado");
        })
        .catch((error) => {
          if (error.code === "auth/weak-password") {
            Alert.alert("La contraseña debe contener al menos 6 caracteres.");
          } else if (error.code === "auth/invalid-email") {
            Alert.alert("El email es inválido");
          } else if (error.code === "auth/missing-email") {
            Alert.alert("El email es obligatorio");
          } else if (error.code === "auth/missing-password") {
            Alert.alert("Por favor, ingrese la contraseña");
          } else if (error.code === "auth/user-not-found") {
            Alert.alert("Usuario no encontrado");
          } else if (error.code === "auth/invalid-credential") {
            Alert.alert("El email o contraseña son incorrectos");
          } else if (error.code === "auth/invalid-email-verified") {
            Alert.alert("El email es incorrecto");
          }
        });
    } catch (error) {
      console.log("Error: ", error);
      if (error.code === "auth/weak-password") {
        alert("La contraseña debe contener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        alert("El email es inválido");
      } else if (error.code === "auth/email-already-in-use") {
        alert("El email ya está en uso");
      } else if (error.code === "auth/missing-email") {
        alert("El email es obligatorio");
      }
    }
  }
  async function UpdateUser() {
    try {
      setButtonDisabled(true);

      const userData = {
        updated_at: new Date(),
        name: userUpdate.data.name,
        //email: userUpdate.data.email,
        phone: userUpdate.data.phone,
      };
      const userRef = await updateDoc(
        doc(db, "users", userUpdate.id),
        userData
      );
      console.log("User updated");
      Alert.alert("¡Datos actualizados!");
      navigation.goBack();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setButtonDisabled(false);
    }
  }
  async function UpdateUserName() {
    try {
      setButtonDisabled(true);

      const userData = {
        updated_at: new Date(),
        name: userUpdate.name,
        last_name: userUpdate.last_name,
        //email: userUpdate.data.email,
        //phone: userUpdate.data.phone,
      };
      const userRef = await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        userData
      );
      console.log("User updated");
      Alert.alert("¡Nombre actualizados");
      navigation.goBack();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setButtonDisabled(true);
    }
  }
  async function UpdateUserPhone() {
    try {
      setButtonDisabled(true);

      const userData = {
        updated_at: new Date(),
        //name: userUpdate.name,
        //last_name: userUpdate.last_name,
        //email: userUpdate.data.email,
        phone: userUpdate.phone,
      };
      const userRef = await updateDoc(
        doc(db, "users", auth.currentUser.uid),
        userData
      );
      console.log("User updated");
      Alert.alert("¡Numero actualizados");
      navigation.goBack();
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setButtonDisabled(false);
    }
  }
  async function SignUser() {
    try {
      signInWithEmailAndPassword(auth, userSign.email, userSign.password)
        .then(async () => {
          console.log("Usuario iniciado. ");
          Alert.alert("¡Bienvenido!");
          navigation.navigate("Principal");
          // const userRef = doc(db, "users", auth.currentUser.uid);
          // onSnapshot(userRef, (doc) => {
          //   console.log("logueado: ", doc.data());
          //   if (doc.data().status == "Activo") {
          //     Alert.alert("¡Bienvenido!");
          //     navigation.navigate("Principal");
          //   } else {
          //     console.log("Cuenta no encontrada");
          //     Alert.alert("Cuenta no encontrada");
          //   }
          // });
        })
        .catch((error) => {
          console.log(error.message);
          if (error.code === "auth/weak-password") {
            Alert.alert("La contraseña debe contener al menos 6 caracteres.");
          } else if (error.code === "auth/invalid-email") {
            Alert.alert("El email es inválido");
          } else if (error.code === "auth/missing-email") {
            Alert.alert("El email es obligatorio");
          } else if (error.code === "auth/missing-password") {
            Alert.alert("Por favor, ingrese la contraseña");
          } else if (error.code === "auth/user-not-found") {
            Alert.alert("Usuario no encontrado");
          } else if (error.code === "auth/invalid-credential") {
            Alert.alert("El email o contraseña son incorrectos");
          } else if (error.code === "auth/invalid-email-verified") {
            Alert.alert("El email es incorrecto");
          } else if (error.message === "auth/invalid-credential)") {
            Alert.alert("Contraseña incorrecta");
          }
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  async function DeleteUser() {
    const email = auth.currentUser.email;
    const password = userDelete.password;
    const credentials = EmailAuthProvider.credential(email, password);

    try {
      await reauthenticateWithCredential(auth.currentUser, credentials);

      const batch = writeBatch(db);
      const userRef = doc(db, "users", auth.currentUser.uid);
      batch.delete(userRef);

      await deleteUser(auth.currentUser);

      await batch.commit();

      await signOut(auth);
      Alert.alert("Cuenta borrada");
      navigation.navigate("Principal");
      console.log("Cuenta borrada con éxito");
    } catch (error) {
      console.log("Error al borrar la cuenta: ", error);
    }
  }
  async function UpdateEmail() {
    const user = auth.currentUser;
    console.log("Props: ", userUpdate);
    if (!user) {
      console.log("Usuario no autenticado");
      return;
    }

    console.log(userUpdate.password);

    try {
      setButtonDisabled(true); // Desactivar el botón
      const credential = EmailAuthProvider.credential(
        user.email,
        userUpdate.password
      );

      await reauthenticateWithCredential(user, credential);
      console.log("usuario reautenticado");

      await updateEmail(user, userUpdate.email);
      console.log("email actualizado");

      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        email: userUpdate.email,
      });
      console.log("actualizado");
      Alert.alert("Correo actualizado");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar el correo electrónico:", error);
    } finally {
      setButtonDisabled(false);
    }
  }

  function handleLogOut() {
    signOut(auth)
      .then(() => {
        console.log("Sesion cerrada.");
        //alert("¡Sesion cerrada!");
        navigation.navigate("Principal");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (callFunction === "RegisterUser") {
            RegisterUser();
          }
          if (callFunction === "UpdateUser") {
            UpdateUser();
          }
          if (callFunction === "UpdateUserName") {
            UpdateUserName();
          }
          if (callFunction === "UpdateUserPhone") {
            UpdateUserPhone();
          }
          if (callFunction === "SignUser") {
            SignUser();
          }
          if (callFunction === "DeleteUser") {
            DeleteUser();
          }
          if (callFunction === "UpdateEmail") {
            UpdateEmail();
          }
        }}
        style={[
          styles.button,
          style,
          (buttonDisabled || disabled) && styles.buttonDisabled,
        ]}
        disabled={buttonDisabled || disabled}
      >
        <Text>{title}</Text>
        {children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borderColor: "grey",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: 10,
  },
  buttonDisabled: {
    opacity: 0.5, // Reduce la opacidad cuando el botón está deshabilitado
  },
});
