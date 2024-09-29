import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: {
    //marginTop: -400,
    marginRight: "60%",
    marginTop: "15%",
    marginBottom: "10%"
  },
  textTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
    borderBottomWidth: 0.2,
  },
  buttonText: {
    marginHorizontal: "10%",
    flex: 0.7,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  contView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  viewButtons: {
    alignItems: "left",
    justifyContent: "left",
    // height: width / 2,
    width: "100%",
    minWidth: "100%",
    borderRadius: 10,
    marginBottom: "100%",
    marginLeft: "15%"
  },
  viewInfo: {
    alignItems: "left",
    justifyContent: "left",
  },
  googleText: {
    color: "#6BB8FF",
    marginLeft: 10,
  },
  viewButton: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 5,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: "#202020",
    width: "100%",
    minWidth: "90%",
  },
  buttonFloat: {
    position: "absolute",
    top: "5%",
    left: 0,
    zIndex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
  },
  Icon: {
    marginLeft: 15,
    //marginRight: 10,
  },
  viewInter: {
    marginHorizontal: 10,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
});

export default styles;
