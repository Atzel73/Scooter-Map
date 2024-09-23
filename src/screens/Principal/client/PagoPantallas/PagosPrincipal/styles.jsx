import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    // marginBottom: "100%",
    marginTop: -400,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  textSubtitle: {
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  viewBoxes: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: "20%",
    //margin: "10%",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
  },
  box: {
    backgroundColor: "#fff",
  },
});

export default styles;
