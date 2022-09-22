import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { api } from "../../../Constants";
import NormalHeader from "../../components/NormalHeader";
import { DataTable } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Empty from "../../components/Empty";
import Header from "../../components/Header";
const ListScreen = (props) => {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const navigation = useNavigation();
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
    <>
      <Header />
      <ScrollView
        style={{ marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          placeholder="Бараа хайх"
          style={{
            borderWidth: 1,
            borderColor: "#c4c4c4",
            padding: 10,
            marginTop: 10,
            fontSize: 18,
          }}
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
        {filterData.length > 0 ? (
          <DataTable>
            {/* Table headeer */}
            <DataTable.Header>
              <DataTable.Title textStyle={{ fontSize: 15 }}>
                Барааны нэр
              </DataTable.Title>
              <DataTable.Title numeric textStyle={{ fontSize: 15 }}>
                Үнэ
              </DataTable.Title>
              <DataTable.Title numeric textStyle={{ fontSize: 15 }}>
                Хэмжээ
              </DataTable.Title>
            </DataTable.Header>
            {/* Table data */}
            {filterData &&
              filterData.map((e, index) => {
                return (
                  <TouchableOpacity
                    key={e._id}
                    onPress={() =>
                      navigation.navigate("ProductDetailScreen", { id: e._id })
                    }
                  >
                    <DataTable.Row>
                      <DataTable.Cell textStyle={{ fontSize: 16 }}>
                        {e.name}
                      </DataTable.Cell>
                      <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                        {e.price}
                      </DataTable.Cell>
                      <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                        {e.quantity}
                        {e.unit.slice(0, 2)}
                      </DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                );
              })}
          </DataTable>
        ) : (
          <Empty text={search} />
        )}
      </ScrollView>
    </>
  );
};

export default ListScreen;
