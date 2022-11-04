import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
import DatePicker from "react-native-modern-datepicker";

const GetProductModal = (props) => {
  const { loanModal, setLoanModal, setRefresh } = props;
  const [isLoan, setIsLoan] = useState(1);
  const [isTemplate, setIsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [loanName, setLoanName] = useState("");
  const [loanPhone, setLoanPhone] = useState("");
  const [loanSize, setLoanSize] = useState("");
  const [loanDate, setLoanDate] = useState("");

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
      .post(`${api}/api/v1/bills/receipt`, { incomeType: "Бэлэн" })
      .then((res) => {
        setRefresh(true);
        setLoanModal(!loanModal);
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
      .post(`${api}/api/v1/bills/receipt`, { incomeType: "Бэлэн бус" })
      .then((res) => {
        setRefresh(true);
        setLoanModal(!loanModal);
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
      .post(`${api}/api/v1/bills/receipt`, {
        incomeType: "Зээл",
        loanName: loanName,
        loanPhone: loanPhone,
        loanSize: loanSize,
        loanDate: loanDate,
      })
      .then((res) => {
        // console.log(res.data.data);
        setRefresh(true);

        setLoanModal(!loanModal);
      })
      .catch((err) => {
        //console.log(err);
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
        <ScrollView style={styles.modalView}>
          <View style={{ marginTop: 10 }}>
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
                name={
                  !isTemplate ? "checkbox-blank-outline" : "checkbox-marked"
                }
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
                    style={{
                      borderWidth: 1,
                      padding: 3,
                      borderColor: "#CCCCCC",
                    }}
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
              <Text style={[styles.textStyle, { fontSize: 16 }]}>Болсон</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLoanModal(!loanModal)}
              style={{ position: "absolute", right: 0, top: -20, zIndex: 100 }}
            >
              <Ionicons name="backspace-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default GetProductModal;

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
    marginTop: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 30,
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
