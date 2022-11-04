import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { EvilIcons,  } from "@expo/vector-icons";
import HalfLoanModal from "./HalfLoanModal";
import moment from "moment";
const LoanInfoModal = (props) => {
  const { id } = props.route.params;
  const [loanModal, setLoanModal] = useState(false);
  const [data, setData] = useState([]);
  const [debt, setDebt] = useState([]);
  const [history, setHistory] = useState([]);
  const getData = () => {
    axios
      .get(`${api}/api/v1/bills/${id}`)
      .then((res) => {
        setData(res.data.data);
        setHistory(res.data.data.deptHistory);
        setDebt(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const fullLoan = () => {
    Alert.alert(
      "Та тийм гэдгийг дарснаар",
      "Таны зээлийн тайланд зээл төлөгдсөн гэж харагдахыг анхаарна уу!",
      [
        {
          text: "Буцах",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .post(`${api}/api/v1/bills/debt/${id}`, {
                amount: data.loanSize ? data.loanSize : 0,
              })
              .then((res) => {
                console.log(res.data.data);
              })
              .catch((err) => {
                //console.log(err);
              });
          },
        },
      ]
    );
  };
  const deleteLoanData = (billId) => {
    Alert.alert(
      "Та устгахдаа итгэлтэй байна уу?",
      "Таны зээлийн тайланд зээл хасагдахыг анхаарна уу!",
      [
        {
          text: "Буцах",
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            axios
              .delete(`${api}/api/v1/bills/debt/${id}/${billId}`)
              .then((res) => {})
              .catch((err) => {
                //console.log(err);
              });
          },
        },
      ]
    );
  };
  if (!data) {
    return null;
  }
  return (
    <View
      style={{
        margin: 20,
        flex: 1,
        opacity: loanModal ? 0.2 : 1,
      }}
    >
      {/* Инфо */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Зээлийн мэдээлэл
      </Text>
      <>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Бэлтгэн нийлүүлэгчийн нэр:{" "}
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 15 }}>
            {data.loanName}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Бэлтгэн нийлүүлэгчийн дугаар:{" "}
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 15 }}>
            {data.loanPhone}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Зээлсэн он сар:{" "}
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 15 }}>
            {moment(data.createdAt).format("YYYY/MM/DD")}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Зээл буцаан олгох хугацаа:
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 15 }}>
            {moment(data.createdAt).format("YYYY/MM/DD")}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Зээл төлөхөд үлдсэн хугацаа:{" "}
          </Text>
          <Text style={{ fontWeight: "300", fontSize: 15 }}>
            {moment(data.createdAt).fromNow()}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            3ээлсэн барааны тоо хэмжээ:{" "}
          </Text>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 15,
              color: data.incomeType === "Зээл" ? "red" : "green",
            }}
          >
            {data.loanSize}₮{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Зээл авлага эсэх:{" "}
          </Text>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 15,
              color: data.incomeType === "Зээл" ? "red" : "green",
            }}
          >
            {data.incomeType}{" "}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#cccccccc",
            marginVertical: 5,
          }}
        />
      </>

      {/* Buttons */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
        Зээлийн төлөх төрөл
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
            backgroundColor: "#175E26",
            padding: 5,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          onPress={fullLoan}
        >
          <Text
            style={{
              color: "white",
              padding: 5,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Зээл бүтэн төлөх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#175E26",
            padding: 5,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            setLoanModal(!loanModal);
          }}
        >
          <Text
            style={{
              color: "white",
              padding: 5,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Зээл хуваан төлөх
          </Text>
        </TouchableOpacity>
      </View>
      {/* Zeeliin tailan */}

      <ScrollView>
        {history &&
          history.map((e) => {
            return (
              <View key={e._id}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 10,
                  }}
                >
                  Зээл төлсөн дэлгэрэнгүй
                </Text>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>
                      Төлсөн хугацаа:{" "}
                      <Text style={{ fontWeight: "300", fontSize: 16 }}>
                        {moment(e.createdAt).format("YYYY/MM/DD")}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginVertical: 5,
                      }}
                    >
                      Төлсөн дүн:{" "}
                      <Text style={{ fontWeight: "300", fontSize: 16 }}>
                        {e.amount}₮
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      Анхны үлдэгдэл:{" "}
                      <Text style={{ fontWeight: "300", fontSize: 16 }}>
                        {e.before}₮
                      </Text>
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      Үлдэгдэл:{" "}
                      <Text style={{ fontWeight: "300", fontSize: 16 }}>
                        {e.before - e.amount}₮
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => deleteLoanData(e._id)}>
                      <EvilIcons name="trash" size={35} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#cccccccc" }} />
              </View>
            );
          })}
      </ScrollView>
      {/* Niit or zeel */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          right: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            backgroundColor: "#ffc0cb",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>
            Нийт өр:<Text style={{ fontWeight: "400" }}> {debt.dept}₮</Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#90ee90",
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>
            Нийт авлага:
            <Text style={{ fontWeight: "400" }}> {debt.receipt}₮</Text>
          </Text>
        </View>
      </View>
      <HalfLoanModal
        setLoanModal={setLoanModal}
        loanModal={loanModal}
        id={id}
      />
    </View>
  );
};

export default LoanInfoModal;
