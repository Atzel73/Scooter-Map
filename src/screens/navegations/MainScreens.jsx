import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../Principal/client/login";
import Register from "../Principal/client/inicio";
import Configuration from "../Principal/client/Configuration";
import EditProfile from "../Principal/client/UserConfig/EditProfile";
import HomeScreen from "../Principal/client/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function UserEnter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Principal" component={HomeScreen} />
      <Stack.Screen
        name="Configurar Perfil"
        component={DrawerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default function Screens() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Configuracion de usuario" component={UserConfig} />
        <Tab.Screen name="Inicio" component={LoginScreens} /> */}

        {isLogged ? (
          <>
            <Stack.Screen
              name="Inicio"
              component={LoginScreens}
              options={{ headerShown: false }}
            />
            {/* <Tab.Screen
              options={{ headerShown: false }}
              name="Configuracion de usuario"
              component={UserConfig}
            /> */}
            <Tab.Screen name="Espera" component={LoginScreens} />
          </>
        ) : (
          <Stack.Screen name="Registrarse" component={UserEnter} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
