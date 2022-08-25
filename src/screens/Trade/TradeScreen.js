import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TradeHeader from "../../components/Trade/TradeHeader";
import IncomeBarCodeSearch from "../../components/Trade/IncomeBarCodeSearch";
import TradeCategory from "../../components/Trade/TradeCategory";
import SearchName from "../../components/Trade/SearchName";
import ResultedProduct from "../../components/Trade/ResultedProduct";
import BasketTable from "../../components/Trade/BasketTable";
import axios from "axios";
import { api } from "../../../Constants";
import GetProductModal from "../../components/Trade/GetProductModal";
import GetDrainModal from "../../components/Trade/GetDrainModal";
import Empty from "../../components/Empty";
const TradeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [enabled, setEnabled] = useState(false);
  // BarcodeModal
  const [incomeBarcode, setIncomeBarcode] = useState(false);
  // Barcoded ilersen data
  const [barcodeData, setBarcodeData] = useState([]);
  // categoryModal
  const [categoryModal, setCategoryModal] = useState(false);
  // SearchByName
  const [filterData, setFilterData] = useState([]);
  // Resulted product modal
  const [priceModal, setPriceModal] = useState(false);
  // Sags
  const [basket, setBasket] = useState([]);
  // Refresh
  const [refresh, setRefresh] = useState(false);
  // isLoan
  const [loanModal, setLoanModal] = useState(false);
  const [drainModal, setDrainModal] = useState(false);
  const [search, setSearch] = useState("");
  const [barcode, setBarcode] = useState("");
  const getBasketData = () => {
    axios
      .get(`${api}/api/v1/transactions/basket?limit=100&sort=-createdAt`)
      .then((res) => {
        setBasket(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
          opacity: incomeBarcode
            ? 0.1
            : categoryModal
            ? 0.2
            : priceModal
            ? 0.2
            : loanModal
            ? 0.2
            : drainModal
            ? 0.2
            : 1,
          height: "100%",
        }}
      >
        {/* header */}
        <TradeHeader enabled={enabled} changeEnabled={setEnabled} />
        <ScrollView style={{}}>
          <View style={{ marginHorizontal: 20 }}>
            {/* SearchBarCode */}
            <IncomeBarCodeSearch
              setIncomeBarcode={setIncomeBarcode}
              incomeBarcode={incomeBarcode}
              setBarcodeData={setBarcodeData}
              setBarcode={setBarcode}
              barcode={barcode}
            />
            {/* Category, search by name, search by photo */}
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
                <Ionicons name="images-outline" size={20} color="black" />
              </TouchableOpacity>
            </View>
            {!enabled && (
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#175E26",
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate("AddProductModal")}
              >
                <Text style={{ color: "white" }}>Бараа бүртгэх</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Onresulted product */}
          {filterData.length > 0 ? (
            <View>
              {barcodeData.length > 0 ? (
                <ResultedProduct
                  barcodeData={barcodeData}
                  priceModal={priceModal}
                  setPriceModal={setPriceModal}
                  setRefresh={setRefresh}
                  enabled={enabled}
                />
              ) : (
                <ResultedProduct
                  barcodeData={filterData}
                  priceModal={priceModal}
                  setPriceModal={setPriceModal}
                  setRefresh={setRefresh}
                  enabled={enabled}
                />
              )}
            </View>
          ) : (
            <Empty text={search} />
          )}

          {/* Basket */}
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
          <View style={{ marginVertical: 50 }} />
        </ScrollView>
        {basket.length > 0 && (
          <>
            {enabled ? (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  backgroundColor: "red",
                  padding: 10,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                onPress={() => setDrainModal(true)}
              >
                <Text style={{ color: "white" }}>Зарлага гаргах</Text>
              </TouchableOpacity>
            ) : (
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
                onPress={() => setLoanModal(true)}
              >
                <Text style={{ color: "white" }}>Орлого авах</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      {enabled ? (
        <GetDrainModal
          setDrainModal={setDrainModal}
          drainModal={drainModal}
          setRefresh={setRefresh}
        />
      ) : (
        <GetProductModal
          setLoanModal={setLoanModal}
          loanModal={loanModal}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default TradeScreen;

const styles = StyleSheet.create({});
