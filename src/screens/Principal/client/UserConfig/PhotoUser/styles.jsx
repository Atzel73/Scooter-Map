import React from "react";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: width,
    aspectRatio: 1,
  },
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF6FF",
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    margin: "auto"
  },
  button:{
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10
  }
});
export default styles;
