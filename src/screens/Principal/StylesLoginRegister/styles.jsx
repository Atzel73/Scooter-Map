import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  passButton:{
    color: "#A4A4A4"
  },
  viewPassword: {
    marginTop: "5%",
    alignItems: "flex-start",
    marginLeft: "10%"
  },
  dividerMain: {
    marginBottom: "10%",
    marginHorizontal: "10%",
    borderBottomWidth: 0.2,
    borderBottomColor: "#A4A4A4",
  },
  Divider: {
    marginTop: "10%",
    marginHorizontal: "10%",
    borderBottomWidth: 0.2,
    borderBottomColor: "#A4A4A4",
  },
  viewLogins: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginRight: "5%",
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  viewBottom: {
    backgroundColor: "#6BB8FF",
    height: 50,
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonFloat: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
  },
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
    marginBottom: 100,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "white",
    // margin: 10,
    //marginBottom: "70%",
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
    width: "100%",
    alignSelf: "center",
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
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3474B0",
    borderRadius: 10,
    margin: 10,
    //padding: 20,
  },
  buttonRegister: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A4A4A4",
    borderRadius: 10,
    margin: 10,
    //padding: 20,
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
    textAlign: "center",
  },
});
export default styles;
