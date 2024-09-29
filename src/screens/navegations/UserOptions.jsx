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
import PagosScreen from "./PagosNavegacion";
import ViajesScreen from "../Principal/client/ViajesPantallas/ViajesScreen";

import ContrasenaScreen from "../Principal/client/UserConfig/Contrasena/ContrasenaScreen";
import NameScreen from "../Principal/client/LoginPhoneScreens/NameScreen";
import EmailScreen from "../Principal/client/LoginPhoneScreens/EmailScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function UserEnter() {
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
        name="Email"
        component={EmailScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#6BB8FF",
          },
          headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="Nombre"
        component={NameScreen}
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