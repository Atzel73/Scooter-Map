import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textTitle:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonFloat: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    //elevation: 5,
    //shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
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
    top: 50,
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
    margin: 5,
    justifyContent: "space-around",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#202020",
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

export default styles;
