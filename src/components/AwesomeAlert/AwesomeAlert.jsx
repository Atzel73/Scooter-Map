import AwesomeAlert from "react-native-awesome-alerts";

export default function CustomAwesome({
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
      confirmText="OK"
      onConfirmPressed={() => {
        setShowAlert(false);
      }}
    />
  );
}
