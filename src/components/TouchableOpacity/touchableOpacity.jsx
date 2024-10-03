import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import styles from "./style";

export default function CustomTouchable({ title, onPress, style, children, disabled }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={[styles.buttonSend, style]} disabled={disabled}>
        <Text style={{ color: "white" }}>{title}</Text>
        {children}
      </TouchableOpacity>
    </View>
  );
}
