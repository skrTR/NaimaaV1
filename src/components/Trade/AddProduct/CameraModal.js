import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
const CameraModal = ({
  cameraModal,
  setCameraModal,
  productCamera,
  openProductImageLibrary,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={cameraModal}
      onRequestClose={() => {
        setCameraModal(!cameraModal);
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
              Зургийн сонголт
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#c4c4c4",
                  padding: 30,
                }}
                onPress={productCamera}
              >
                <Entypo name="camera" size={24} color="black" />
                <Text>Зураг дарах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#c4c4c4",
                  padding: 30,
                }}
                onPress={openProductImageLibrary}
              >
                <View style={{ alignItems: "center" }}>
                  <Entypo name="camera" size={24} color="black" />
                  <Text>Зураг оруулах</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setCameraModal(!cameraModal)}
            style={{ position: "absolute", margin: 20, right: 0 }}
          >
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CameraModal;

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
