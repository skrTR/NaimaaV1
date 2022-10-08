import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
const PackageModal = (props) => {
  const { loanModal, setLoanModal, id } = props;
  const [isLoan, setIsLoan] = useState(1);
  const [isSum, setIsSum] = useState(false);
  const [loanName, setLoanName] = useState("Жак");
  const [loanPhone, setLoanPhone] = useState("99110401");
  const [loanSize, setLoanSize] = useState("1500");
  const [loanDate, setLoanDate] = useState("2022-08-01");
  const postIncome = () => {
    axios
      .post(`${api}/api/v1/bills/${!isSum ? "receipt" : "drain"}`, {
        incomeType: isLoan === 1 ? "Бэлэн" : isLoan === 2 ? "Бэлэн бус" : "",
        template: id,
      })
      .then((res) => {
        setLoanModal(!loanModal);
        console.log(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const postLoanIncome = () => {
    axios
      .post(`${api}/api/v1/bills/${!isSum ? "receipt" : "drain"}`, {
        template: id,
        incomeType: "Зээл",
        loanName: loanName,
        loanPhone: loanPhone,
        loanSize: loanSize,
        loanDate: loanDate,
      })
      .then((res) => {
        setLoanModal(!loanModal);
      })
      .catch((err) => {
        // console.log(err);
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setIsSum(false)}
            >
              <MaterialCommunityIcons
                name={isSum ? "checkbox-blank-outline" : "checkbox-marked"}
                size={24}
                color="black"
              />
              <Text>Орлого</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setIsSum(true)}
            >
              <MaterialCommunityIcons
                name={!isSum ? "checkbox-blank-outline" : "checkbox-marked"}
                size={24}
                color="black"
              />
              <Text>Зарлага</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setIsLoan(1)}
            >
              <MaterialCommunityIcons
                name={
                  isLoan === 1 ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={24}
                color="black"
              />
              <Text>Бэлэнээр</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setIsLoan(2)}
            >
              <MaterialCommunityIcons
                name={
                  isLoan === 2 ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={24}
                color="black"
              />
              <Text>Бэлэн бусаар</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setIsLoan(3)}
            >
              <MaterialCommunityIcons
                name={
                  isLoan === 3 ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={24}
                color="black"
              />
              <Text>Зээлээр</Text>
            </TouchableOpacity>
          </View>

          {isLoan === 3 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Бэлтгэн нийлүүлэгчийн нэр
              </Text>
              <TextInput
                placeholder="Бэлтгэн нийлүүлэгчийн нэр"
                style={{
                  borderWidth: 1,
                  padding: 3,
                  borderColor: "#CCCCCC",
                }}
                placeholderTextColor={"grey"}
                value={loanName}
                onChangeText={setLoanName}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Бэлтгэн нийлүүлэгчийн дугаар
              </Text>
              <TextInput
                placeholder="Бэлтгэн нийлүүлэгчийн дугаар"
                style={{
                  borderWidth: 1,
                  padding: 3,
                  borderColor: "#CCCCCC",
                }}
                placeholderTextColor={"grey"}
                value={loanPhone}
                onChangeText={setLoanPhone}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                3ээлсэн барааны тоо хэмжээ
              </Text>
              <TextInput
                placeholder="3ээлсэн барааны тоо хэмжээ"
                style={{
                  borderWidth: 1,
                  padding: 3,
                  borderColor: "#CCCCCC",
                }}
                placeholderTextColor={"grey"}
                value={loanSize}
                onChangeText={setLoanSize}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Зээл төлөх хугацаа
              </Text>
              <TextInput
                placeholder="Зээл төлөх хугацаа"
                style={{
                  borderWidth: 1,
                  padding: 3,
                  borderColor: "#CCCCCC",
                }}
                placeholderTextColor={"grey"}
                value={loanDate}
                onChangeText={setLoanDate}
              />
            </View>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={isLoan === 3 ? postLoanIncome : postIncome}
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

export default PackageModal;

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
