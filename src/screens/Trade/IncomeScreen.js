import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import IncomeBarCodeSearch from "../../components/Trade/IncomeBarCodeSearch";
import TradeCategory from "../../components/Trade/TradeCategory";
import SearchName from "../../components/Trade/SearchName";
import ResultedProduct from "../../components/Trade/ResultedProduct";
import Empty from "../../components/Empty";
import axios from "axios";
import { api } from "../../../Constants";
import BasketTable from "../../components/Trade/BasketTable";
import GetProductModal from "../../components/Trade/GetProductModal";
const IncomeScreen = () => {
  //   Шилчих
  const navigation = useNavigation();
  //   Дэлгэц дээр байгаа үгүйг хэлнэ
  const isFocused = useIsFocused();

  //   Шинэчлэл хийх стате
  const [refresh, setRefresh] = useState(false);
  // Barcode modal
  const [barcodeModal, setBarcodeModal] = useState(false);

  // Категори модал
  const [categoryModal, setCategoryModal] = useState(false);
  // Нэрээр хайх модал
  const [search, setSearch] = useState("");
  // Нэрээр хайгаад илэрсэн дата
  const [filterData, setFilterData] = useState([]);
  // Resulted product modal
  const [priceModal, setPriceModal] = useState(false);
  // Сагсны дата
  const [basket, setBasket] = useState([]);
  //   Orlogo avah modal
  const [incomeModal, setIncomeModal] = useState(false);
  // Сагс дуудах
  const getBasketData = () => {
    axios
      .get(`${api}/api/v1/transactions/basket?limit=100&sort=-createdAt`)
      .then((res) => {
        setBasket(res.data.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  useEffect(() => {
    getBasketData();
    setRefresh(false);
  }, [refresh, isFocused]);

  return (
    <>
      <View
        style={{
          opacity: barcodeModal
            ? 0.1
            : categoryModal
            ? 0.2
            : priceModal
            ? 0.2
            : incomeModal
            ? 0.2
            : 1,
          height: "100%",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Хайлтын хэсэг */}
          <View style={{ marginHorizontal: 20 }}>
            {/* Barcode оор хайх */}
            <IncomeBarCodeSearch
              setBarcodeModal={setBarcodeModal}
              barcodeModal={barcodeModal}
            />
            {/* Category Name Photo хайх */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {/* Cateogry */}
              <TradeCategory
                categoryModal={categoryModal}
                setCategoryModal={setCategoryModal}
              />
              {/* Search by name */}
              <SearchName
                setFilterData={setFilterData}
                search={search}
                setSearch={setSearch}
              />
              {/* Search by photo */}
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#c4c4c4",
                  padding: 5,
                }}
                onPress={() => navigation.navigate("SearchByPhoto")}
              >
                <Ionicons name="images-outline" size={25} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Бараа бүртгэх товч */}
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#175E26",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
              marginHorizontal: 20,
            }}
            onPress={() => navigation.navigate("AddProductModal")}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Бараа бүртгэх</Text>
          </TouchableOpacity>
          {/* Гарч ирсэн бараанууд */}
          <View style={{ marginHorizontal: 10 }}>
            {filterData && filterData.length > 0 ? (
              <View>
                <ResultedProduct
                  barcodeData={filterData}
                  priceModal={priceModal}
                  setPriceModal={setPriceModal}
                  setRefresh={setRefresh}
                />
              </View>
            ) : (
              <Empty text={`Бараа байхгүй байна`} />
            )}
          </View>
          {/* Сагсандах бараанууд */}
          {basket.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#FF9B05",
                  marginLeft: 20,
                  borderTopLeftRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    padding: 10,
                    marginLeft: 20,
                  }}
                >
                  Сагсанд оногдсон бараа
                </Text>
              </View>
              <BasketTable basket={basket} setRefresh={setRefresh} />
            </View>
          )}
        </ScrollView>
        {basket.length > 0 && (
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              alignItems: "center",
              backgroundColor: "#175E26",
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
            }}
            onPress={() => setIncomeModal(true)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Орлого авах</Text>
          </TouchableOpacity>
        )}
      </View>

      <GetProductModal
        setLoanModal={setIncomeModal}
        loanModal={incomeModal}
        setRefresh={setRefresh}
      />
    </>
  );
};

export default IncomeScreen;

const styles = StyleSheet.create({});
