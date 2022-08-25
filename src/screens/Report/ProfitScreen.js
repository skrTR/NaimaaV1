import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";
import { api } from "../../../Constants";

const ProfitScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const getAllData = () => {
    axios
      .get(`${api}/api/v1/transactions/profit`)
      .then((res) => {
        setData(res.data.goodsMargins);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);
  const header = {
    tableHead: ["Нэр", "Борлуулсан тоо", "Борлуулсан үнэ", "Нэгж үнэ", "Ашиг"],
    widthArr: [100, 60, 80, 100, 120],
  };
  const state = header;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={["Ашиг орлогын тайлан"]}
              style={styles.header1}
              textStyle={styles.text1}
            />
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {data.map((rowData, index) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProductDetailScreen", {
                      id: rowData[5],
                    })
                  }
                  key={index}
                >
                  <Row
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.text}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfitScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  text1: { textAlign: "center", fontWeight: "800" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  header1: { height: 50, backgroundColor: "#cccccccc" },
});
