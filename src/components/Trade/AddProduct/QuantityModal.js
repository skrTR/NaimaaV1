import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
const QuantityModal = ({
  quantityModal,
  setQuantityModal,
  setProductQuantity,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={quantityModal}
      onRequestClose={() => {
        setQuantityModal(!quantityModal);
      }}
    >
      <View style={styles.centeredView1}>
        <View style={styles.modalView1}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 20,
              }}
            >
              Категори сонголт
            </Text>
            {["кг", "литр", "см", "ширхэг", "мк2", "мк3"].map((e, index) => {
              return (
                <View key={index} style={{ marginVertical: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setProductQuantity(e);
                      setQuantityModal(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginLeft: 20,
                      }}
                    >
                      {e}
                    </Text>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#c4c4c4",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={() => setQuantityModal(!quantityModal)}
            style={{ position: "absolute", margin: 20, right: 0 }}
          >
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuantityModal;

const styles = StyleSheet.create({
  centeredView1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "40%",
  },
  modalView1: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
