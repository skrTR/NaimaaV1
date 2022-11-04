import {
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";

const BasketTable = ({ basket, setRefresh }) => {
  const [priceModal, setPriceModal] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const removeBasket = (id) => {
    axios
      .delete(`${api}/api/v1/transactions/${id}`)
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const editBasket = (id) => {
    axios
      .put(`${api}/api/v1/transactions/${id}`, {
        price: price,
        quantity: quantity,
      })
      .then((res) => {
        setRefresh(true);
        setPriceModal(!priceModal);
      })
      .catch((err) => {
        // console.log(err);
        setPriceModal(!priceModal);
      });
  };
  const changed = (prices, quantitys) => {
    setPrice(prices);
    setQuantity(quantitys);
    setPriceModal(true);
  };
  return (
    <DataTable style={{ opacity: priceModal ? 0.2 : 1 }}>
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
      {basket.map((e, index) => {
        return (
          <View key={index}>
            {e.good && (
              <DataTable.Row>
                <DataTable.Cell textStyle={{ fontSize: 16 }}>
                  {e.good.name}
                </DataTable.Cell>
                <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                  {e.price}
                </DataTable.Cell>
                <DataTable.Cell numeric textStyle={{ fontSize: 16 }}>
                  {e.quantity}
                </DataTable.Cell>
                <DataTable.Cell style={{ left: 10 }}>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#FF9B05",
                        padding: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => removeBasket(e._id)}
                    >
                      <AntDesign name="minus" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "grey",
                        padding: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        changed(e.price, e.quantity);
                      }}
                    >
                      <FontAwesome
                        name="pencil-square-o"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            )}
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
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>Үнэ</Text>
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

                      editBasket(e._id);
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
      })}
    </DataTable>
  );
};

export default BasketTable;

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
