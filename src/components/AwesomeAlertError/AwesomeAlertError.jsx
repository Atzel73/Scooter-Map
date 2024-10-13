import AwesomeAlert from "react-native-awesome-alerts";

export default function CustomAwesomeError({
  showAlert,
  setShowAlert,
  title,
  message,
}) {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      cancelButtonTextColor="red"
      showConfirmButton={true}
      confirmText="Entendido"
      confirmButtonColor="red"
      onConfirmPressed={() => {
        setShowAlert(false);
      }}
      contentStyle={{ backgroundColor: "#ffe5e5" }}
      titleStyle={{ color: "red", fontWeight: "bold" }}
      messageStyle={{ color: "#333" }}
    />
  );
}
