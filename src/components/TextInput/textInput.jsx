import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import styles from "./style";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  style,
}) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
      />
    </View>
  );
}
