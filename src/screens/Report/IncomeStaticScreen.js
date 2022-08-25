import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import moment from "moment";
const IncomeStaticScreen = () => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getData = () => {
    axios
      .get(`${api}/api/v1/bills/user?limit=1000&sort=-createdAt&type=Орлого`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, [isFocused]);
  return (
    <>
      {data.map((data) => {
        return (
          <TouchableOpacity
            key={data._id}
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
              <Text>
                Сагсны дугаар: O{data.number && data.number.slice(2, 9)}
              </Text>
              <Text>
                Нийт дүн:{" "}
                {data.finalPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                ₮
              </Text>
              <Text>Орлогын төрөл: {data.incomeType} </Text>
            </View>
            <Text>{moment(data.createdAt).format("YYYY-MM-DD")}</Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default IncomeStaticScreen;

const styles = StyleSheet.create({});
