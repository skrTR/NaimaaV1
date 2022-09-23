import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import * as Linking from "expo-linking";
import UserContext from "../../context/UserContex";
import { api } from "../../../Constants";
const QpayModal = (props) => {
  const { id } = props.route.params;
  const state = useContext(UserContext);
  const [banks, setBanks] = useState([]);
  const getData = () => {
    axios
      .get(`${api}/api/v1/wallets/${id}`)
      .then((res) => {
        setBanks(res.data.data.urls);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <FlatList
      data={banks}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <View style={{}}>
            <TouchableOpacity
              onPress={() => Linking.openURL(`${item.link}`)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
                marginVertical: 3,
                borderWidth: 1,
                borderColor: "#cccccc",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <Image
                source={{ uri: `${item.logo}` }}
                style={{ width: 80, height: 80, borderRadius: 20 }}
              />
              <Text style={{ marginLeft: 20 }}>{item.description}</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

export default QpayModal;

const styles = StyleSheet.create({});
