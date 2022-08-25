import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const OutcomeStatic = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "red",
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
        <Text>Сагсны дугаар: Z{data.number && data.number.slice(2, 9)}</Text>
        <Text>
          Нийт дүн:{" "}
          {data.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
        </Text>
        <Text>Зарлагын төрөл: {data.incomeType} </Text>
      </View>
      <Text>{moment(data.createdAt).format("YYYY-MM-DD")}</Text>
    </TouchableOpacity>
  );
};

export default OutcomeStatic;

const styles = StyleSheet.create({});
