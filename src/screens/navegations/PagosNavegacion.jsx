import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

import PagosPrincipal from "../Principal/client/PagoPantallas/PagosPrincipal";
import AgregarTarjetaScreen from "../Principal/client/PagoPantallas/AgregarTarjeta/AgregarTarjetaScreen";
export default function PagosScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PagosPrincipal"
        component={PagosPrincipal}
        options={{
          headerShown: false,
          //   headerStyle: {
          //     backgroundColor: "#6BB8FF",
          //   },
          //   headerTintColor: "#6BB8FF",
        }}
      />
      <Stack.Screen
        name="AgregarTarjeta"
        component={AgregarTarjetaScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
