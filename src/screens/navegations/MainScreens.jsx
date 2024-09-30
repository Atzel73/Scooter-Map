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

import SoporteScreens from "./SoporteNavigation";
import PagosScreen from "./PagosNavegacion";
import ViajesScreen from "../Principal/client/ViajesPantallas/ViajesScreen";

import UserEnter from "./UserOptions";
import AcercaScreens from "../Principal/client/AcercaDe/AcercaScreens";
import EliminadaScreen from "../../components/CuentaEliminada/EliminadaScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
      <Stack.Screen
        name="Eliminar"
        component={EliminadaScreen}
        options={{
          headerShown: false,
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
      <Stack.Screen
        component={PagosScreen}
        name="Pagos"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ViajesScreen}
        name="Viajes"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AcercaScreens}
        name="AcercaDe"
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
