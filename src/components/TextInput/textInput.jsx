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
  maxLength,
}) {
  return (
    <View>
      <TextInput
        maxLength={maxLength}
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
