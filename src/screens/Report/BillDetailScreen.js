import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
const BillDetailScreen = (props) => {
  const { bill, number, type, createdAt, finalPrice } = props.route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const getBill = () => {
    axios
      .get(`${api}/api/v1/transactions/user?bill=${bill}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBill();
  }, []);
  return (
    <>
      <ScrollView style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            color: type === "Орлого" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {type}
        </Text>
        <Text style={{}}>
          Сагсны дугаар:
          <Text style={{ fontWeight: "bold" }}>{number}</Text>
        </Text>
        <Text style={{}}>
          Үүсгэсэн огноо: {moment(createdAt).format("YYYY-MM-DD hh:mm")}
        </Text>
        <Text style={{}}>
          Нийт дүн:{" "}
          {finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮
        </Text>
        {data.map((e) => {
          return (
            <View
              key={e._id}
              style={{ borderWidth: 1, marginTop: 5, borderRadius: 10 }}
            >
              {e.good && (
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    source={{ uri: `${api}/upload/${e.good.photo}` }}
                    style={{ width: 90, height: 90, borderRadius: 10 }}
                  />
                  <View style={{ marginLeft: 5 }}>
                    <Text>Барааны нэр: {e.good.name}</Text>
                    <Text>Орлогын төрөл: {e.incomeType}</Text>
                    <Text>Тоо ширхэг: {e.quantity}</Text>
                    <Text>Ширхэгийн үнэ: {e.price}</Text>
                    <Text>
                      Нийт үнэ:{" "}
                      {e.finalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <View style={{ position: "absolute", bottom: 30, right: 0, left: 0 }}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            Alert.alert("Тун удахгүй", "", [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Хэвлэх
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Буцах
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BillDetailScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#175E26",
  },
});
