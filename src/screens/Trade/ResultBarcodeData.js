import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { DataTable } from "react-native-paper";
import Empty from "../../components/Empty";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
const ResultBarcodeData = (props) => {
  const { id } = props.route.params;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [priceModal, setPriceModal] = useState([]);
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [good, setGood] = useState("");
  let isMounted = true;
  const getData = () => {
    axios
      .get(`${api}/api/v1/goods/user?barCode=${id}`)
      .then((res) => {
        if (isMounted) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const goBasket = () => {
    axios
      .post(`${api}/api/v1/transactions`, {
        good: good,
        price: price,
        quantity: quantity,
      })
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  useEffect(() => {
    getData();
    return () => (isMounted = false);
  }, []);
  return (
    <DataTable style={{ opacity: priceModal ? 1 : 0.2 }}>
      <DataTable.Header>
        <DataTable.Title textStyle={{ fontSize: 14 }}>
          Барааны нэр
        </DataTable.Title>
        <DataTable.Title numeric textStyle={{ fontSize: 14 }}>
          Үнэ
        </DataTable.Title>
        <DataTable.Title numeric textStyle={{ fontSize: 14 }}>
          Хэмжээ
        </DataTable.Title>
        <DataTable.Title numeric></DataTable.Title>
      </DataTable.Header>
      {data.length > 0 ? (
        data.map((e) => {
          return (
            <View key={e._id}>
              <DataTable.Row>
                <DataTable.Cell textStyle={{ fontSize: 16 }}>
                  {e.name}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      navigation.navigate("ProductDetailScreen", {
                        id: e._id,
                      })
                    }
                  >
                    <Text style={{ fontSize: 16 }}>{e.price}₮</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      navigation.navigate("ProductDetailScreen", {
                        id: e._id,
                      })
                    }
                  >
                    <Text style={{ fontSize: 16 }}>{e.quantity}</Text>
                    <Text style={{ fontSize: 16 }}>{e.unit.slice(0, 2)}</Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={{ left: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#175E26",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                      }}
                      onPress={() => {
                        setGood(e._id);
                        setPriceModal(true);
                        setPrice(e.price);
                        setQuantity(e.quantity);
                      }}
                    >
                      <AntDesign name="plus" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "grey",
                        padding: 8,
                        marginLeft: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("ProductDetailScreen", {
                          id: e._id,
                        })
                      }
                    >
                      <FontAwesome
                        name="angle-double-right"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
              {/* Price modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={priceModal}
                onRequestClose={() => {
                  setPriceModal(!priceModal);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      Үнэ
                    </Text>
                    <TextInput
                      placeholder="Үнэ"
                      keyboardType="numeric"
                      style={{
                        borderWidth: 1,
                        padding: 3,
                        borderColor: "#CCCCCC",
                        fontSize: 16,
                      }}
                      placeholderTextColor={"grey"}
                      // value={codePrice.price && codePrice.price.toString()}
                      // onChangeText={checkPrice}
                      value={price.toString()}
                      onChangeText={setPrice}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 10,
                        fontSize: 18,
                      }}
                    >
                      Хэмжээ
                    </Text>
                    <TextInput
                      placeholder="Хэмжээ"
                      style={{
                        borderWidth: 1,
                        padding: 3,
                        borderColor: "#CCCCCC",
                        fontSize: 16,
                      }}
                      placeholderTextColor={"grey"}
                      value={quantity.toString()}
                      onChangeText={setQuantity}
                    />

                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        // BasketData(e._id, e.price, e.quantity, e.name);
                        goBasket();
                        setPriceModal(!priceModal);
                      }}
                    >
                      <Text style={[styles.textStyle, { fontSize: 18 }]}>
                        Болсон
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setPriceModal(!priceModal)}
                      style={{ position: "absolute", padding: 20, right: 0 }}
                    >
                      <Ionicons
                        name="backspace-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          );
        })
      ) : (
        <Empty text={"Таны хайсан баркодтой бараа байхгүй байна"} />
      )}
    </DataTable>
  );
};

export default ResultBarcodeData;
const styles = StyleSheet.create({
  productText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  productText1: {
    color: "grey",
    marginTop: 10,
  },
  borderLine: {
    borderWidth: 0.45,
    borderColor: "#CCCCCC",
    marginVertical: 5,
  },
  linedCenter: {
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#175E26",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
