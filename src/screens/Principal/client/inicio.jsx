import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text>Primera pagina a mostrar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
