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
import axios from "axios";
import { api } from "../../../Constants";
const IncomeBarCodeSearch = (props) => {
  const {
    setIncomeBarcode,
    incomeBarcode,
    setBarcodeData,
    setBarcode,
    barcode,
  } = props;
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcode(data);
    Alert.alert("Баркод амжилттай уншигдлаа", `${data} таны уншуулсан баркод`, [
      {
        text: "Дахин уншуулах",
        onPress: () => setScanned(false),
        style: "cancel",
      },
      {
        text: "Болсон",
        onPress: () => {
          setIncomeBarcode(false);
          axios
            .get(`${api}/api/v1/goods/user?barCode=${data}`)
            .then((res) => {
              setBarcodeData(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };
  if (hasPermission === null) {
    return (
      <Text style={{ textAlign: "center", marginTop: 200 }}>
        Requesting for camera permission
      </Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={{ textAlign: "center" }}>No access to camera</Text>;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <TextInput
        placeholder="Баркодоор хайх"
        style={{
          borderWidth: 1,
          borderColor: "#D9D9D9",
          padding: 10,
          width: "100%",
          ...props.style,
        }}
        value={barcode}
        onChangeText={setBarcode}
      />

      <TouchableOpacity
        style={{ right: 55, padding: 20 }}
        onPress={() => setIncomeBarcode(true)}
      >
        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={incomeBarcode}
        onRequestClose={() => {
          setIncomeBarcode(!incomeBarcode);
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
              onPress={() => setIncomeBarcode(!incomeBarcode)}
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
