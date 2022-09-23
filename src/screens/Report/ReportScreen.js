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
              Зарлагын гүйлгээний тайлан
            </Text>
          </TouchableOpacity>
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
              Гүйлгээний тайлан
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("BoughtRemainderScreen")}
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
              Эхний үлдэгдэл болон дундаж үнэ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfitScreen")}
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
              Ашиг орлогын тайлан
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AllReportChooseModal")}
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
        </View>
      ) : (
        <PaymentScreen />
      )}
    </>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
