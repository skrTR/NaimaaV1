import { StyleSheet, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../../../Constants";
import { useIsFocused } from "@react-navigation/native";

const SearchName = (props) => {
  const { setFilterData, search, setSearch } = props;
  const [masterData, setMasterData] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchCompany();
    return () => {};
  }, [isFocused]);
  const fetchCompany = () => {
    const apiURL = `${api}/api/v1/goods/user?limit=100`;
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
    <View style={{ width: "61%" }}>
      <TextInput
        placeholder="Бараа хайх"
        style={{
          borderWidth: 1,
          borderColor: "#c4c4c4",
          padding: 10,
        }}
        value={search}
        onChangeText={(text) => searchFilter(text)}
      />
    </View>
  );
};

export default SearchName;

const styles = StyleSheet.create({});
