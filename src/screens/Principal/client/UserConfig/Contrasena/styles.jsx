import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  iconFlotante: {
    position: "absolute",
    zIndex: 1,
    top: "30%",
    right: "15%",
    bottom: 0,
    left: 0,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  viewText: {
    alignItems: "center",
    justifyContent: "center",
  },
  Divider: {
    marginHorizontal: "10%",
    borderBottomWidth: 0.2,
    borderBottomColor: "#A4A4A4",
    marginVertical: "5%",
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
  textTitle: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  viewFlotante: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E4E4",
    width: "100%",
    borderRadius: 5,
    elevation: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    zIndex: 10,
    marginTop: -350,
    marginBottom: 10,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    marginRight: "5%",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  contView: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonFloat: {
    marginTop: "5%",
    marginLeft: -350,
    backgroundColor: "#E4E4E4",
    padding: 10,
    borderRadius: 30,
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  viewBottom: {
    backgroundColor: "#6BB8FF",
    height: 50,
    width: "100%",
    marginBottom: -100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default styles;
