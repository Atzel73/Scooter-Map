import React, { useState } from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "50%",
    backgroundColor: "#E2E2E2",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: "100%",
  },
  modalTitle: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  drawerButton: {
    position: "absolute",
    top: 100,
    left: 20,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  Icon: {
    marginLeft: 10,
    //marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
    //flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
    backgroundColor: "#202020",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    borderColor: "#202020",
    marginBottom: 10,
  },
  extraButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    borderColor: "#202020",
    marginBottom: 10,
  },
  contView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewUser: {
    width: "110%",
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    //margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    marginHorizontal: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  miniText: {
    color: "#4772A9",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default styles;
