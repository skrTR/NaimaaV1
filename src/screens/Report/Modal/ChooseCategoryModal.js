import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../../../Constants";
import { useNavigation } from "@react-navigation/native";

const ChooseCategoryModal = (props) => {
  const { type } = props.route.params;
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    fetchCompany();
    return () => {};
  }, []);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/categories?limit=100`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => {
        alert(error);
      });
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };
  return (
    <View
      style={{ marginHorizontal: 20 }}
      //   showsVerticalScrollIndicator={false}
    >
      <TextInput
        placeholder="Бараа хайх"
        style={{
          borderWidth: 1,
          borderColor: "#c4c4c4",
          padding: 10,
          marginTop: 10,
          fontSize: 18,
          marginBottom: 10,
          color: "black",
        }}
        placeholderTextColor={"#cccccc"}
        value={search}
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filterData}
        keyExtractor={(id, index) => index}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ReportCategoryModal", {
                  type: type,
                  id: item._id,
                })
              }
            >
              <Text
                style={{
                  fontSize: 20,
                  marginVertical: 5,
                  borderWidth: 1,
                  borderColor: "#cccccc",
                  padding: 8,
                  borderRadius: 10,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChooseCategoryModal;

const styles = StyleSheet.create({});
