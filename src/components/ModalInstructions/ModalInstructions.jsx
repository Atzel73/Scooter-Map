import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const InstructionsModal = ({ modalVisible, openModal, closeModal }) => {
  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal */}
      <TouchableOpacity style={styles.openButton} onPress={openModal}>
        <Text style={styles.openButtonText}>Abrir Instrucciones</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Instrucciones</Text>
            <ScrollView>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Si has iniciado sesión con Google:</Text>
              </Text>
              <Text style={styles.listItem}>
                - No es necesario que ingreses tu correo electrónico manualmente, ya que la cuenta de Google automáticamente lo proporciona.
              </Text>
              <Text style={styles.listItem}>
                - Al usar Google para iniciar sesión, tus datos como el nombre y la foto de perfil serán sincronizados con los de tu cuenta de Google.
              </Text>

              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Si creaste primero una cuenta con Google:</Text>
              </Text>
              <Text style={styles.listItem}>
                - Si intentas vincular esta cuenta con otra que creaste manualmente (usando correo electrónico y contraseña), no será posible vincularlas. Solo puedes tener una cuenta vinculada por correo electrónico.
              </Text>

              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Si creaste una cuenta manualmente (con correo y contraseña) primero:</Text>
              </Text>
              <Text style={styles.listItem}>
                - Puedes vincular tu cuenta manual con tu cuenta de Google para facilitar el inicio de sesión en el futuro.
              </Text>
              <Text style={styles.listItem}>
                - Una vez vinculadas, podrás iniciar sesión con cualquiera de los métodos (Google o correo/contraseña), y ambas estarán sincronizadas.
              </Text>

              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Advertencia sobre la vinculación de cuentas:</Text>
              </Text>
              <Text style={styles.listItem}>
                - Una cuenta de correo electrónico solo puede estar vinculada a un único usuario. Si ya existe una cuenta asociada a ese correo, no podrás crear una nueva o vincular otra a ese correo.
              </Text>
              <Text style={styles.listItem}>
                - Si ya has vinculado tu cuenta de Google, no podrás vincular una cuenta normal con el mismo correo.
              </Text>
            </ScrollView>

            {/* Botón para cerrar el modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 10,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default InstructionsModal;
