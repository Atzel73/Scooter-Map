import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginTop: "10%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  formContainer: {
    // width: width * 0.9,
    // paddingVertical: 30,
    // paddingHorizontal: 20,
    // borderRadius: 15,
    // alignItems: "center",
    // justifyContent: "center",
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
   
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  contView: {
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#fdd",
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "#d00",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonSend: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6BB8FF",
    borderRadius: 10,
    margin: 10,
    padding: 20
  },
  buttonGoogle: {
    width: "90%",
    height: 45,
    backgroundColor: "blue",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    margin: "5%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: 'center'
  },
});
export default styles;
