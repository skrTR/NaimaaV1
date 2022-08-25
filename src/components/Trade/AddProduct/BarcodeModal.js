import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
const fullWidth = Dimensions.get("window").width;
const BarcodeModal = ({
  modalVisible,
  setModalVisible,
  scanned,
  handleBarCodeScanned,
  setBarcode,
  setScanned,
  barcode,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
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
              Qr code scanner
            </Text>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ width: fullWidth, height: 200 }}
            />
            <TextInput
              placeholder="Баркод гараар шивэх"
              style={{
                borderWidth: 1,
                padding: 10,
                borderColor: "#c4c4c4",
                marginTop: 15,
                marginHorizontal: 20,
              }}
              placeholderTextColor="grey"
              value={barcode}
              onChangeText={setBarcode}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#175E26",
                marginTop: 10,
                marginHorizontal: 20,
                opacity: barcode ? 1 : 0.2,
              }}
              onPress={() => setModalVisible(false)}
              disabled={barcode ? false : true}
            >
              <Text
                style={{ textAlign: "center", padding: 10, color: "white" }}
              >
                Баталгаажуулах
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ position: "absolute", margin: 20, right: 0 }}
          >
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>
          {scanned ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setScanned(false);
                  setBarcode("");
                }}
                style={{ position: "absolute", margin: 20, left: 0 }}
              >
                <AntDesign name="retweet" size={24} color="black" />
              </TouchableOpacity>
            </>
          ) : barcode ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  setScanned(false);
                  setBarcode("");
                }}
                style={{ position: "absolute", margin: 20, left: 0 }}
              >
                <AntDesign name="retweet" size={24} color="black" />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default BarcodeModal;

const styles = StyleSheet.create({
  centeredView1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "60%",
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
