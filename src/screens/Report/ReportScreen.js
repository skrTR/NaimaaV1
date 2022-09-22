import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
const ReportScreen = () => {
  const navigation = useNavigation();
  return (
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
        onPress={() => navigation.navigate("AllReportScreen")}
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
  );
};

export default ReportScreen;

const styles = StyleSheet.create({});
