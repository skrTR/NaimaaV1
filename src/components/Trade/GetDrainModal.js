import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import DatePicker from "react-native-modern-datepicker";
import { api } from "../../../Constants";
const GetDrainModal = (props) => {
  const { drainModal, setDrainModal, setRefresh } = props;
  const [isLoan, setIsLoan] = useState(1);
  const [isTemplate, setIsTemplate] = useState(false);
  const [loanName, setLoanName] = useState("");
  const [loanPhone, setLoanPhone] = useState("");
  const [loanSize, setLoanSize] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [picker, setPicker] = useState(false);
  const postIncome = () => {
    if (isTemplate) {
      axios
        .post(`${api}/api/v1/templates`, { name: templateName })
        .then((res) => {
          // console.log(res.data.data, "template");
        })
        .catch((err) => {
          //console.log(err);
        });
    }
    axios
      .post(`${api}/api/v1/bills/drain`, { incomeType: "Бэлэн" })
      .then((res) => {
        setRefresh(true);
        setDrainModal(!drainModal);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const postIncomeOnline = () => {
    if (isTemplate) {
      axios
        .post(`${api}/api/v1/templates`, { name: templateName })
        .then((res) => {
          console.log(res.data.data, "template");
        })
        .catch((err) => {
          //console.log(err);
        });
    }
    axios
      .post(`${api}/api/v1/bills/drain`, { incomeType: "Бэлэн бус" })
      .then((res) => {
        setRefresh(true);
        setDrainModal(!drainModal);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const postLoanIncome = () => {
    if (isTemplate) {
      axios
        .post(`${api}/api/v1/templates`, { name: templateName })
        .then((res) => {
          console.log(res.data.data, "template");
        })
        .catch((err) => {
          //console.log(err);
        });
    }
    axios
      .post(`${api}/api/v1/bills/drain`, {
        incomeType: "Зээл",
        loanName: loanName,
        loanPhone: loanPhone,
        loanSize: loanSize,
        loanDate: loanDate,
      })
      .then((res) => {
        // console.log(res.data.data);
        setRefresh(true);

        setDrainModal(!drainModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={drainModal}
      onRequestClose={() => {
        setDrainModal(!drainModal);
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
              onPress={() => setIsLoan(1)}
            >
              <MaterialCommunityIcons
                name={
                  isLoan === 1 ? "checkbox-marked" : "checkbox-blank-outline"
                }
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: isLoan === 1 ? "700" : "500",
                }}
              >
                Бэлнээр{" "}
              </Text>
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: isLoan === 2 ? "700" : "500",
                }}
              >
                Бэлэн бусаар
              </Text>
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: isLoan === 3 ? "700" : "500",
                }}
              >
                Зээлээр
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 10,
            }}
            onPress={() => setIsTemplate(!isTemplate)}
          >
            <MaterialCommunityIcons
              name={!isTemplate ? "checkbox-blank-outline" : "checkbox-marked"}
              size={24}
              color="black"
            />
            <Text>Загвар гүйлгээ болгох</Text>
          </TouchableOpacity>
          {isTemplate && (
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Загвар гүйлгээний нэр
              </Text>
              <TextInput
                placeholder="Загвар гүйлгээний нэр"
                style={{
                  borderWidth: 1,
                  padding: 3,
                  borderColor: "#CCCCCC",
                }}
                placeholderTextColor={"grey"}
                value={templateName}
                onChangeText={setTemplateName}
              />
            </View>
          )}
          {isLoan === 3 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Бэлтгэн нийлүүлэгчийн нэр
              </Text>
              <TextInput
                placeholder="Бэлтгэн нийлүүлэгчийн нэр"
                keyboardType="default"
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
                keyboardType={"number-pad"}
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
                keyboardType="numeric"
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
                3ээл төлөх хугацаа
              </Text>
              {!picker ? (
                <DatePicker
                  onSelectedChange={(date) => {
                    setLoanDate(date);
                    setPicker(true);
                  }}
                  mode="calendar"
                  style={{ borderRadius: 10 }}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => setPicker(!picker)}
                  style={{ borderWidth: 1, padding: 3, borderColor: "#CCCCCC" }}
                >
                  <Text>{loanDate}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={
              isLoan === 1
                ? postIncome
                : isLoan === 2
                ? postIncomeOnline
                : isLoan === 3
                ? postLoanIncome
                : null
            }
          >
            <Text style={styles.textStyle}>Зарлага гаргах</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDrainModal(!drainModal)}
            style={{ position: "absolute", padding: 20, right: 0 }}
          >
            <Ionicons name="backspace-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GetDrainModal;

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
