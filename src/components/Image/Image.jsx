import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "./styles";

export default function CustomImage({ style, source }) {
  return (
    <View>
      <Image style={[styles.img, style]} source={source} />
    </View>
  );
}
