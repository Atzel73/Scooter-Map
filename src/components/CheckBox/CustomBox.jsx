import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
export default function CustomBox({ isChecked, toggleBox }) {
  return (
    <Pressable
      style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
      onPress={() => toggleBox(!isChecked)}
    >
      {isChecked && <FontAwesome6 name="check" size={15} color="black" style={{margin: 1}} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    backgroundColor: "#D9D9D9",
    margin: 10,
  },
  checkboxChecked: {
    backgroundColor: "#D9D9D9",
  },
});
