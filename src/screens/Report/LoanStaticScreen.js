import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";
import { api } from "../../../Constants";

const LoanStaticScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const getAllData = () => {
    axios
      .get(`${api}/api/v1/bills/debt?type=Орлого`)
      .then((res) => {
        setData(res.data.debtsList);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);
  const header = {
    tableHead: [
      "Зээлдэгчийн нэр",
      "Зээлдэгчийн утас",
      "Зээлсэн хэмжээ",
      "Зээлсэн он сар",
      "Зээл буцаан төлөх",
      "Төлсөн эсэх",
    ],
    widthArr: [120, 120, 120, 120, 120, 120],
  };
  const state = header;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
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
                    navigation.navigate("LoanInfoModal", {
                      id: rowData[6],
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
export default LoanStaticScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center" },
  text1: { textAlign: "center", fontWeight: "800" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  header1: { height: 50, backgroundColor: "#cccccccc" },
});
