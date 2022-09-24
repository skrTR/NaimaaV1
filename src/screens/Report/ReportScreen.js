import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import PaymentScreen from "../Payment/PaymentScreen";
import UserContext from "../../context/UserContex";
const ReportScreen = () => {
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const isFocused = useIsFocused();
  const [time, setTime] = useState([]);
  const getUserData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}`)
      .then((res) => {
        setTime(res.data.time);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getUserData();
  }, [isFocused]);
  return (
    <>
      {time ? (
        <View>
          <Header />
          {/* 1.Орлого гүйлгээний тайлан */}
          <TouchableOpacity
            onPress={() => navigation.navigate("IncomeStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Орлогын гүйлгээний жагсаалт
            </Text>
          </TouchableOpacity>
          {/* 1.Орлого гүйлгээний тайлан энд*/}
          {/* 2.Зарлага гүйлгээний тайлан */}
          <TouchableOpacity
            onPress={() => navigation.navigate("OutcomeStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Зарлагын гүйлгээний жагсалт
            </Text>
          </TouchableOpacity>
          {/* 2.Зарлага гүйлгээний тайлан end*/}
          {/* 3.Гүйлгээ ний тайлан */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChooseModal", { type: "TransactionReport" })
            }
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Гүйлгээний тайлан
            </Text>
          </TouchableOpacity>
          {/* 3.Гүйлгээ ний тайлан end */}
          {/* 4.Бараа бүтээгдэхүүний тайлан */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChooseModal", { type: "BoughtRemainder" })
            }
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Бараа бүтээгдэхүүний тайлан
            </Text>
          </TouchableOpacity>
          {/* 4.Бараа бүтээгдэхүүний тайлан end */}
          {/* 5.Борлуулалт үр ашгийн тайлан */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChooseModal", { type: "Profit" })
            }
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Борлуулалт үр ашгийн тайлан
            </Text>
          </TouchableOpacity>
          {/* 5.Борлуулалт үр ашгийн тайлан end */}
          {/* 6.Зээлийн тайлан */}
          <TouchableOpacity
            onPress={() => navigation.navigate("LoanStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Зээлийн тайлан
            </Text>
          </TouchableOpacity>
          {/* 6.Зээлийн тайлан end*/}
          {/* 7.Авлагын тайлан */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ReceivableStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Авлагын тайлан
            </Text>
          </TouchableOpacity>
          {/* 7.Авлагын тайлан end*/}
          {/* 8.Борлуулалт төсөөллийн нэгдсэн тайлан шинээр хийнэ !!! */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChooseModal", { type: "SalesForecast" });
            }}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Борлуулалт төсөөллийн нэгдсэн тайлан
            </Text>
          </TouchableOpacity>
          {/* 8.Борлуулалт төсөөллийн нэгдсэн тайлан end*/}
          {/* 9.Тооллогын тайлан шинээр хийнэ !!! */}
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("ReceivableStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Тооллогын тайлан тайлан
            </Text>
          </TouchableOpacity> */}
          {/* 9.Тооллогын тайлан тайлан end*/}
          {/* 10.Нэгдсэн тайлан */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChooseModal", { type: "AllReport" })
            }
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Нэгдсэн тайлан
            </Text>
          </TouchableOpacity>
          {/* 10.Нэгдсэн тайлан end */}
          {/* 11.Бүх тайлан */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AllStaticScreen")}
            style={{
              backgroundColor: "#175E26",
              padding: 5,
              marginTop: 10,
              marginHorizontal: 10,
              borderRadius: 10,
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
              Бүх тайлан
            </Text>
          </TouchableOpacity>
          {/* 11.Бүх тайлан end */}
        </View>
      ) : (
        <PaymentScreen />
      )}
    </>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
