import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";
import { api } from "../../../Constants";

const BoughtRemainderScreen = (props) => {
  const { data, startDate, endDate } = props.route.params;
  const navigation = useNavigation();

  const header = {
    tableHead: [
      "Бараа материалын нэр төрөл",
      "Тоо хэмжээ",
      "Нийт өртөг",
      "Нэгжийн дундаж өртөг",
      "Тоо хэмжээ",
      "Нийт өртөг",
      "Тоо хэмжээ",
      "Нийт өртөг",
    ],
    widthArr: [100, 60, 80, 100, 120, 140, 160, 180],
  };
  const state = header;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={[
                `${moment(startDate).format("YYYY-MM-DD")} наас ${moment(
                  endDate
                ).format("YYYY-MM-DD")} борлуулалт үр ашгийн тайлан`,
              ]}
              style={styles.header1}
              textStyle={styles.text}
              // widthArr={[780]}
            />
            <Row
              data={[
                "Эхний үлдэгдэл + худалдаж авсан бараа материал",
                "Борлуулалт",
                "Нийт бараа бүтээгдэхүүний үлдэгдэл",
              ]}
              style={styles.header1}
              textStyle={styles.text}
              widthArr={[340, 260, 340]}
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
                      id: rowData[8],
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
export default BoughtRemainderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  header1: { height: 50, backgroundColor: "#cccccccc" },
});
