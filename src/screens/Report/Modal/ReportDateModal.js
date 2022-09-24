import { Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import Loading from "../../../components/Loading";

const ReportDateModal = (props) => {
  const { type } = props.route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const getData = (date, dates) => {
    const date1 = moment().subtract(date, dates).format();
    const now = moment().format();
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
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              getData(1, "days");
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
              Өдрөөр
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              getData(7, "days");
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
              7 хоногоор
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              getData(1, "months");
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
              1 сар
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ReportDateModal;
