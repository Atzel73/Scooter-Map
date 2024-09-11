import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import styles from "./style";

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  style,
  keyboardType,
  placeholderTextColor,
  autoFocus,
  secureTextEntry,
}) {
  return (
    <View>
      <TextInput
        autoFocus={autoFocus}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
