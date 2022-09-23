import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const AllReportChooseModal = () => {
  const navigation = useNavigation();
  return (
    <View>
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
          Категори-оор авах
        </Text>
      </TouchableOpacity>
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
          Хугацаагаар нийтд нь авах
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllReportChooseModal;

const styles = StyleSheet.create({});
