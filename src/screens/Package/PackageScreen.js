import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import Header from "../../components/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContex";
import moment from "moment";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PaymentScreen from "../Payment/PaymentScreen";
import Empty from "../../components/Empty";
import useCheck from "../hooks/useCheck";
const PackageScreen = () => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [time] = useCheck();

  const getData = () => {
    axios
      .get(`${api}/api/v1/templates?createUser=${state.userId}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, [isFocused]);
  return (
    <>
      {time ? (
        <View>
          <Header />
          <Text style={{ margin: 20, fontWeight: "bold", fontSize: 18 }}>
            Загвар гүйлгээнүүд
          </Text>
          {data.length > 0 ? (
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      marginVertical: 5,
                      padding: 5,
                      marginHorizontal: 10,
                      borderRadius: 10,
                      borderColor: "#cccccccc",
                    }}
                    onPress={() =>
                      navigation.navigate("PackageDetailScreen", {
                        id: item._id,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{item.name}</Text>
                      <FontAwesome
                        name="angle-double-right"
                        size={18}
                        color="black"
                        style={{ top: 6, right: 5 }}
                      />
                    </View>
                    <Text>{moment(item.createdAt).fromNow()} </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Empty text={"Та загвар гүйлгээ хадгалаагүй байна"} />
          )}
        </View>
      ) : (
        <PaymentScreen />
      )}
    </>
  );
};

export default PackageScreen;

const styles = StyleSheet.create({});
