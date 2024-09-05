import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  buttonText: {
    width: "95%",
    fontSize: 16,
    marginLeft: 10,
  },
  contView: {
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  viewHead: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -300,
    margin: "10%",
    padding: "10%",
  },
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginTop: -300
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    width: 150,
    height: 50,
  },
  viewField: {
    marginHorizontal: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ECF6FF",
    borderRadius: 5,
    marginBottom: 10,
    width: "95%",
    minWidth: 350,
  },
});
export default styles;
