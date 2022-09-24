import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
const DateExtendScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* 1 sar sungah */}
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              setLoading(true);
              axios
                .post(`${api}/api/v1/users/invoice/${state.userId}`, {
                  amount: 100,
                })
                .then((res) => {
                  setLoading(false);
                  navigation.navigate("QpayModal", { id: res.data.data });
                })
                .catch((err) => {
                  //console.log(err);
                  setLoading(false);
                });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              1 сараар сунгах
            </Text>
          </TouchableOpacity>
          {/* 2 sar sungah */}
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              setLoading(true);
              axios
                .post(`${api}/api/v1/users/invoice/${state.userId}`, {
                  amount: 150,
                })
                .then((res) => {
                  navigation.navigate("QpayModal", { id: res.data.data });
                  setLoading(false);
                })
                .catch((err) => {
                  //console.log(err);
                  setLoading(false);
                });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              2 сараар сунгах
            </Text>
          </TouchableOpacity>
          {/* 3 sar sungah */}
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              setLoading(true);
              axios
                .post(`${api}/api/v1/users/invoice/${state.userId}`, {
                  amount: 200,
                })
                .then((res) => {
                  navigation.navigate("QpayModal", { id: res.data.data });
                  setLoading(false);
                })
                .catch((err) => {
                  //console.log(err);
                  setLoading(false);
                });
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "white",
                textAlign: "center",
              }}
            >
              3 сараар сунгах
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DateExtendScreen;

const styles = StyleSheet.create({});
