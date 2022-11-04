import { StyleSheet, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { DataTable } from "react-native-paper";
const InventoryScreen = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${api}/api/v1/barcodes?limit=1000`)
      .then((res) => {
        setData(res.data.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Баркод</DataTable.Title>
          <DataTable.Title numeric>Ширхэг</DataTable.Title>
        </DataTable.Header>
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          {data.map((e) => {
            return (
              <DataTable.Row key={e._id}>
                <DataTable.Cell>{e.barcode}</DataTable.Cell>
                <DataTable.Cell numeric>{e.count}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </DataTable>
    </>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({});
