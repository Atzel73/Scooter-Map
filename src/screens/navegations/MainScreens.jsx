import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../Principal/client/login";
import Register from "../Principal/client/inicio";
import Configuration from "../Principal/client/UserConfig/Configuration";
import EditProfile from "../Principal/client/UserConfig/EditarPerfil/EditProfile";
import EditPhoto from "../Principal/client/UserConfig/PhotoUser/EditPhotoUser";
import app, { db } from "../../db/conection";
import BorrarCuenta from "../Principal/client/UserConfig/BorrarCuenta/BorrarCuenta";
import { getAuth } from "firebase/auth";
import HomeScreen from "../Principal/client/Principal/HomeScreen";
import BlockUser from "../Principal/client/BlockUser";
import EditarNombreScreen from "../Principal/client/UserConfig/EditarNombre/EditarNombreScreen";
import EditarNumeroScreen from "../Principal/client/UserConfig/EditarNumero/EditarNumeroScreen";
import EditarCorreoScreen from "../Principal/client/UserConfig/EditarCorreo/EditarCorreoScreen";

import LoginName from "../Principal/client/LoginsScreens/LoginName";
import LoginPhone from "../Principal/client/LoginsScreens/LoginPhoneScreen";
import RegisterPhoneMain from "../Principal/client/RegisterPhoneMain";
import VerifyCode from "../Principal/client/VerifyCode";
import Autenticado from "../Principal/client/Autenticado";
import SoporteScreens from "./SoporteNavigation";

import ContrasenaScreen from "../Principal/client/UserConfig/Contrasena/ContrasenaScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function UserEnter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="LoginName"
        component={LoginName}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="LoginPhone"
        component={LoginPhone}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="RegisterPhone"
        component={RegisterPhoneMain}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Verificar"
        component={VerifyCode}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Autenticar"
        component={Autenticado}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Cambiar Contraseña"
        component={ContrasenaScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
    </Stack.Navigator>
  );
}

function UserConfig() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Config"
        component={Configuration}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Cambiar nombre"
        component={EditarNombreScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Cambiar numero"
        component={EditarNumeroScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Cambiar correo"
        component={EditarCorreoScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Cambiar foto"
        component={EditPhoto}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Borrar Cuenta"
        component={BorrarCuenta}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
    </Stack.Navigator>
  );
}

function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Configuracion de Usuario" component={UserConfig} />
    </Drawer.Navigator>
  );
}

function LoginScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Principal"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Configurar Perfil"
        component={UserConfig}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Bloquear" component={BlockUser} />
      <Stack.Screen
        name="Iniciar Sesion"
        component={UserEnter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SoporteScreens}
        name="Soporte"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function Screens() {
  const [isLogged, setIsLogged] = useState(true);
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("Hay usuario");
    } else {
      console.log("No hay usuario");
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Tab.Screen name="Configuracion de usuario" component={UserConfig} />
        <Tab.Screen name="Inicio" component={LoginScreens} /> */}
        <Stack.Screen
          name="Inicio"
          component={LoginScreens}
          options={{ headerShown: false }}
        />
        {/* 
        {!isLogged ? (
          <>
            <Stack.Screen
              name="Inicio"
              component={LoginScreens}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              options={{ headerShown: false }}
              name="Configuracion de usuario"
              component={UserConfig}
            />
            <Tab.Screen name="Espera" component={LoginScreens} />
          </>
        ) : (
          <Stack.Screen name="Registrarse" component={UserEnter} />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
