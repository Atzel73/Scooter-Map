import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
  },
  image: {
    height: "60%",
    width: "50%",
    marginLeft: 10,
    marginRight: 10,
  },
  viewHead: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 30,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFloat: {
    position: "absolute",
    top: "3%",
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
    marginTop: 55,
    //marginRight: "50%",
  },
  textTitle: {
    fontSize: 26,
    fontWeight: "bold",
    // marginBottom: 10,
    // marginTop: 10,
    // marginLeft: 10,
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
