import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Loading from "../../../components/Loading";
import DatePicker from "react-native-modern-datepicker";

const ReportDateModal = (props) => {
  const { type } = props.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);
  const getData = () => {
    const date1 = startDate;
    const now = endDate;
    setLoading(true);
    axios
      .post(`${api}/api/v1/transactions/profit`, {
        date1: date1,
        date2: now,
      })
      .then((res) => {
        if (type === "TransactionReport") {
          navigation.navigate("TransactionReport", {
            startDate: date1,
            endDate: now,
            data: res.data.transactionReport,
          });
        } else if (type === "BoughtRemainder") {
          navigation.navigate("BoughtRemainderScreen", {
            startDate: date1,
            endDate: now,
            data: res.data.goodsLists,
          });
        } else if (type === "Profit") {
          navigation.navigate("ProfitScreen", {
            startDate: date1,
            endDate: now,
            data: res.data.goodsMargins,
          });
        } else if (type === "SalesForecast") {
          navigation.navigate("SalesForecastReport", {
            startDate: date1,
            endDate: now,
            data: res.data.salesForecastReport,
          });
        } else if (type === "AllReport") {
          navigation.navigate("AllReportScreen", {
            startDate: date1,
            endDate: now,
            data: res.data.goodsReceipts,
          });
        } else if (type === "AllStatic") {
          navigation.navigate("AllStaticScreen", {
            startDate: date1,
            endDate: now,
            data: res.data.goodsLists,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Эхлэх хугацаа
          </Text>

          {!startPicker ? (
            <DatePicker
              onSelectedChange={(date) => {
                setStartDate(date);
                setStartPicker(true);
              }}
              mode="calendar"
              style={{ borderRadius: 10 }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setStartPicker(!startPicker)}
              style={{
                borderWidth: 1,
                padding: 8,
                borderColor: "#CCCCCC",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>{startDate}</Text>
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginTop: 10,
            }}
          >
            Дуусах хугацаа
          </Text>

          {!endPicker ? (
            <DatePicker
              onSelectedChange={(date) => {
                setEndDate(date);
                setEndPicker(true);
              }}
              mode="calendar"
              style={{ borderRadius: 10 }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setEndPicker(!endPicker)}
              style={{
                borderWidth: 1,
                padding: 8,
                borderColor: "#CCCCCC",
                marginHorizontal: 10,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16 }}>{endDate}</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              getData(1, "years");
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
              1 жил
            </Text>
          </TouchableOpacity> */}
          {console.log(startDate.length)}
          {console.log(endDate.length)}
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              if (startDate.length < 1) {
                return Alert.alert("Эхлэх хугацааг сонгоно уу");
              } else if (endDate.length < 1) {
                return Alert.alert("Дуусах хугацааг сонгоно уу");
              } else {
                getData();
              }
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
              Шүүх
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default ReportDateModal;
