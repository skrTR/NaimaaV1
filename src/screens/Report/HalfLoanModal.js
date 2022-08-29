import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
const HalfLoanModal = (props) => {
  const { loanModal, setLoanModal, id } = props;
  const [loanSize, setLoanSize] = useState("");
  const editData = () => {
    axios
      .post(`${api}/api/v1/bills/debt/${id}`, {
        amount: loanSize,
      })
      .then((res) => {
        setLoanModal(!loanModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loanModal}
      onRequestClose={() => {
        setLoanModal(!loanModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Хуваан төлөх дүн
          </Text>
          <TextInput
            placeholder={"Хуваан төлөх дүн"}
            style={{
              borderWidth: 1,
              padding: 3,
              borderColor: "#CCCCCC",
            }}
            placeholderTextColor={"grey"}
            value={loanSize}
            onChangeText={setLoanSize}
          />

          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={editData}
          >
            <Text style={styles.textStyle}>Болсон</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLoanModal(!loanModal)}
            style={{ position: "absolute", padding: 20, right: 0 }}
          >
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HalfLoanModal;

const styles = StyleSheet.create({
  productText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productText1: {
    color: "grey",
    marginTop: 10,
  },
  borderLine: {
    borderWidth: 0.45,
    borderColor: "#CCCCCC",
    marginVertical: 5,
  },
  linedCenter: {
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#175E26",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
