import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const IncomeStatic = ({ data }) => {
  const navigation = useNavigation();
  console.log(data);
  return (
    <>
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "green",
          borderRadius: 20,
          padding: 5,
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("BillDetailScreen", {
            bill: data.id,
            number: data.number,
            type: data.type,
            createdAt: data.createdAt,
            finalPrice: data.finalPrice,
          })
        }
      >
        <View style={{}}>
          <Text>Сагсны дугаар: O{data.number && data.number.slice(2, 9)}</Text>
          <Text>
            Нийт дүн:{" "}
            {data.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
          </Text>
          <Text>Орлогын төрөл: {data.incomeType} </Text>
        </View>
        <Text>{moment(data.createdAt).format("YYYY-MM-DD")}</Text>
      </TouchableOpacity>
    </>
  );
};

export default IncomeStatic;

const styles = StyleSheet.create({});
