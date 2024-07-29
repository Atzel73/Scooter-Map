import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

export default function CustomActivity() {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="large" color="#ECF6FF" />
    </View>
  );
}
