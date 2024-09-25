import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  viewImage: {
    marginHorizontal: 25,
  },
  viewBox: {
    marginHorizontal: 25,
    marginLeft: 90,
    marginRight: 50,
  },
  box: {
    backgroundColor: "#F3F3F3",
  },
  container: {
    //marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  viewMain: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    borderBottomWidth: 0.2,
    marginHorizontal: "5%",
  },
  viewDates: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginLeft: 55,
    marginRight: 50,
  },
  viewStars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
    marginTop: 10,
    marginLeft: 50,
  },
});

export default styles;
