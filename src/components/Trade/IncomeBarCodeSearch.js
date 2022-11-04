import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  Text,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
const IncomeBarCodeSearch = (props) => {
  const { setBarcodeModal, barcodeModal } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Баркод амжилттай уншигдлаа", `${data} таны уншуулсан баркод`, [
      {
        text: "Дахин уншуулах",
        onPress: () => setScanned(false),
        style: "cancel",
      },
      {
        text: "Болсон",
        onPress: () => {
          setBarcodeModal(false);
          navigation.navigate("ResultBarcodeData", { id: data });
        },
      },
    ]);
  };
  if (hasPermission === null) {
    return (
      <Text style={{ textAlign: "center", marginTop: 200 }}>
        Та камера ийн эрх нээгээгүй байна
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <Text style={{ textAlign: "center" }}>
        Та камера ийн эрх нээгээгүй байна
      </Text>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 5,
      }}
    >
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => setBarcodeModal(true)}
      >
        <Text
          style={{
            borderWidth: 1,
            borderColor: "#D9D9D9",
            padding: 10,
            fontSize: 16,
            color: "#ccc",
          }}
        >
          Баркодоор хайх
        </Text>

        <MaterialCommunityIcons
          name="barcode-scan"
          size={24}
          color="black"
          style={{ position: "absolute", right: 10, bottom: 0, top: 6 }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={barcodeModal}
        onRequestClose={() => {
          setBarcodeModal(!barcodeModal);
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
                style={{ width: "100%", height: 200 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setBarcodeModal(!barcodeModal)}
              style={{ position: "absolute", padding: 20, right: 0 }}
            >
              <Ionicons name="backspace-outline" size={24} color="black" />
            </TouchableOpacity>
            {scanned && (
              <>
                <TouchableOpacity
                  onPress={() => setScanned(false)}
                  style={{ position: "absolute", margin: 20, left: 0 }}
                >
                  <AntDesign name="retweet" size={24} color="black" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IncomeBarCodeSearch;

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
