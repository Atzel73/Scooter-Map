import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  drawerButton: {
    position: "absolute",
    top: 20,
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
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    textAlign: "left",
    flex: 1,
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
    flexDirection: "row",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    //padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default { styles, stylesModal };
