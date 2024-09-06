import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import SoporteScreen from "../Principal/client/SoportePantallas/SoportePrincipal/SoporteScreen";
import ConsejosScreen from "../Principal/client/SoportePantallas/Consejos/ConsejosScreen";
import ViajandoScreen from "../Principal/client/SoportePantallas/Viajando/ViajandoScreen";
import SugerenciasScreen from "../Principal/client/SoportePantallas/Sugerencias/SugerenciasScreen";
import OfertaScreen from "../Principal/client/SoportePantallas/OfertaTerceros/OfertaScreen";
export default function SoporteScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoporteScreen"
        component={SoporteScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen component={ConsejosScreen} name="Consejos" />
      <Stack.Screen component={ViajandoScreen} name="Viajando" />
      <Stack.Screen component={OfertaScreen} name="Ofertas" />
      <Stack.Screen component={SugerenciasScreen} name="Sugerencias" />
    </Stack.Navigator>
  );
}
