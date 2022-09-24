import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";

const SalesForecastReport = (props) => {
  const { data, startDate, endDate } = props.route.params;
  const navigation = useNavigation();

  const header = {
    tableHead: [
      "Бараа бүтээгдэхүүний нэр төрөл",
      "Тоо ширхэг",
      "Нэгжийн дундаж өртөг",
      "Нийт үнэ",
      "Борлуулсан барааны дундаж үнэ",
      "Төсөөллийн борлуулалт /дундаж үнээр/",
      "Төсөөллийн ашиг",
    ],
    widthArr: [150, 90, 120, 120, 120, 120, 120],
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
            />
            <Row
              data={["", "Бараа бүтээгдэхүүн", ""]}
              style={styles.header1}
              textStyle={styles.text}
              widthArr={[150, 330, 360]}
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
export default SalesForecastReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center" },
  text1: { textAlign: "center", fontWeight: "800" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  header1: { height: 50, backgroundColor: "#cccccccc" },
});
