import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import MyButton from "../../components/MyButton";
import { api } from "../../../Constants";
import MyButton2 from "../../components/MyButton2";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
const TransactionReport = (props) => {
  const { data, startDate, endDate } = props.route.params;
  const navigation = useNavigation();
  const header = {
    tableHead: ["Нэр", "Тоо хэмжээ", "Дүн", "Тоо хэмжээ", "Дүн"],
    widthArr: [100, 90, 90, 100, 100],
  };
  const state = header;
  // convert pdf
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
    <h2>Гүйлгээний тайлан</h2>
    <table style="width:100%">
      <tr>
        <th colspan="5"  text-align: center;>${moment(startDate).format(
          "YYYY-MM-DD"
        )} наас ${moment(endDate).format("YYYY-MM-DD")} гүйлгээ</th>  
      </tr>
      <tr>
<th colspan="1"></th>
<th colspan="2">Орлогын гүйлгээ</th>
<th colspan="2">Зарлагын гүйлгээ</th>
      </tr>
      <tr>
<th>Нэр</th>
<th>Тоо хэмжээ</th>
<th>Дүн</th>
<th>Тоо хэмжээ</th>
<th>Дүн</th>
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
  // conver excel
  const generateExcel = () => {
    let newData = data;
    newData.map((e) => {
      e.pop();
    });
    newData.unshift(["Нэр", "Тоо хэмжээ", "Дүн", "Тоо хэмжээ", "Дүн"]);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(newData);
    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "TransactionReport.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      shareAsync(filename);
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={[
                `${moment(startDate).format("YYYY-MM-DD")} наас ${moment(
                  endDate
                ).format("YYYY-MM-DD")} гүйлгээ`,
              ]}
              style={styles.header1}
              textStyle={styles.text}
              widthArr={[480]}
            />
            <Row
              data={["", "Орлогын гүйлгээ", "Зарлагын гүйлгээ"]}
              style={styles.header1}
              textStyle={styles.text}
              widthArr={[100, 180, 200]}
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
      <MyButton onPress={printToFile} />
      <View style={{ marginVertical: 5 }} />
      <MyButton2 onPress={generateExcel} />
    </View>
  );
};
export default TransactionReport;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center" },
  text1: { textAlign: "center", fontWeight: "800" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  header1: { height: 50, backgroundColor: "#cccccccc" },
});
