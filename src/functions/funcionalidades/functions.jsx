import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";


export default function Funcionalidades({ title, callFunction, data }) {

  function showData() {
    console.log("dentro", data)
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (callFunction === "showData") {
            showData();
          }
        }}
      style={styles.button}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    borrderWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    marginHorizontal: 10,
  },
});
