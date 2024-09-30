import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  viewBottom: {
    backgroundColor: "#E4E4E4",
    height: "100%",
    width: "90%",
    borderTopRightRadius: 90,
    borderTopLeftRadius: 90,
    position: "absolute",
    top: 450,
    right: "5%",
    left: "5%",
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    marginBottom: "100%",
  },
  viewDelete: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "red",
    fontSize: 25,
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default styles;
