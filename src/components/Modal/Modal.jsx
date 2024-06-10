import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import styles from "./styles";
export default function CustomModal({ modalVisible, toggleModal }) {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={toggleModal} style={styles.buttonClose}>
              <Text>Cerrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonClose}>
              <Text>Ver imagen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
