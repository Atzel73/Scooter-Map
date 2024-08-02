import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#F0EFEF",
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  paragraph: {
    fontSize: 15,
    textAlign: "center",
    margin: 5,
  },
  checkbox: {
    margin: 8,
  },
  header: {
    alignItems: "center",
    margin: "5%",
  },
  text: {
    fontSize: 18,
  },
  subtext: {
    fontSize: 14,
  },
  viewBoxes: {
    //flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    margin: "10%",
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 20,
    backgroundColor: "red",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default styles;
