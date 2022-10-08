import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from "react-native-table-component";
import { api } from "../../../Constants";
import * as Print from "expo-print";
import MyButton from "../../components/MyButton";
import { shareAsync } from "expo-sharing";
const LoanStaticScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const getAllData = () => {
    axios
      .get(`${api}/api/v1/bills/debt?type=Орлого`)
      .then((res) => {
        setData(res.data.debtsList);
        console.log(res.data);
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
      "Бэлтгэн нийлүүлэгчийн нэр",
      "Бэлтгэн нийлүүлэгчийн дугаар",
      "3ээлсэн барааны тоо хэмжээ",
      "Зээлсэн он сар",
      "Зээл буцаан төлөх",
      "Төлсөн эсэх",
    ],
    widthArr: [120, 120, 120, 120, 120, 120],
  };
  const state = header;
  const createDynamicData = () => {
    var datas = "";
    for (let i in data) {
      const item = data[i];
      datas =
        datas +
        `<tr>
        <td>${item[0] ? item[0] : ""}</td>
        <td>${item[1] ? item[1] : ""}</td>
        <td>${item[2] ? item[2] : ""}</td>
        <td>${item[3] ? item[3] : ""}</td>
        <td>${item[4] ? item[4] : ""}</td>
        <td>${item[5] ? item[5] : ""}</td>
      </tr>`;
    }

    const html = `
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #A9A9A9;
      text-align: center;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    
    <img width="20%" src="${api}/upload/8alogo.png" alt="">
    <h2>Зээлийн тайлан</h2>
    <table style="width:100%">
      <tr>
<th>Бэлтгэн нийлүүлэгчийн нэр</th>
<th>Бэлтгэн нийлүүлэгчийн дугаар</th>
<th>3ээлсэн барааны тоо хэмжээ</th>
<th>Зээлсэн он сар</th>
<th>Зээл буцаан төлөх</th>
<th>Төлсөн эсэх</th>
      </tr>
      ${datas}
     
    </table>
    
    </body>
    </html>
    `;
    return html;
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: createDynamicData(),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
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
      <MyButton onPress={printToFile} />
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
