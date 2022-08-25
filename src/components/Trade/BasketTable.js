import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";

const BasketTable = ({ basket, setRefresh }) => {
  const removeBasket = (id) => {
    axios
      .delete(`${api}/api/v1/transactions/${id}`)
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Барааны нэр</DataTable.Title>
        <DataTable.Title numeric>Үнэ</DataTable.Title>
        <DataTable.Title numeric>Хэмжээ</DataTable.Title>
        <DataTable.Title numeric></DataTable.Title>
      </DataTable.Header>
      {basket.map((e, index) => {
        return (
          <View key={index}>
            {e.good && (
              <DataTable.Row>
                <DataTable.Cell>{e.good.name}</DataTable.Cell>
                <DataTable.Cell numeric>{e.price}</DataTable.Cell>
                <DataTable.Cell numeric>{e.quantity}</DataTable.Cell>
                <DataTable.Cell style={{ left: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FF9B05",
                        padding: 3,
                      }}
                      onPress={() => removeBasket(e._id)}
                    >
                      <AntDesign name="minus" size={15} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "grey",
                        padding: 3,
                        marginLeft: 5,
                      }}
                    >
                      <FontAwesome
                        name="angle-double-right"
                        size={15}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </View>
        );
      })}
    </DataTable>
  );
};

export default BasketTable;

const styles = StyleSheet.create({});
