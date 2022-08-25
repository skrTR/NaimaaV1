import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation } from "@react-navigation/native";
const ResultedProduct = (props) => {
  const { barcodeData, priceModal, setPriceModal, setRefresh, enabled } = props;
  const [good, setGood] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();

  const goBasket = () => {
    axios
      .post(`${api}/api/v1/transactions`, {
        good: good,
        price: price,
        quantity: quantity,
      })
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <DataTable>
        {/* Table headeer */}
        <DataTable.Header>
          <DataTable.Title>Барааны нэр</DataTable.Title>
          <DataTable.Title numeric>Үнэ</DataTable.Title>
          <DataTable.Title numeric>Хэмжээ</DataTable.Title>
          <DataTable.Title numeric></DataTable.Title>
        </DataTable.Header>
        {/* Table data */}
        {barcodeData &&
          barcodeData.map((e, index) => {
            return (
              <View key={e._id}>
                <DataTable.Row>
                  <DataTable.Cell>
                    <AntDesign name="staro" size={15} color="#FF9B05" />
                    {/* <AntDesign name="star" size={24} color="black" /> */}
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
                      <Text>{e.price}</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() =>
                        navigation.navigate("ProductDetailScreen", {
                          id: e._id,
                        })
                      }
                    >
                      <Text>{e.quantity}</Text>
                      <Text>{e.unit}</Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                  <DataTable.Cell style={{ left: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                      {enabled ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "red",
                            padding: 3,
                          }}
                          onPress={() => {
                            setGood(e._id);
                            setPrice(e.price);
                            setQuantity(e.quantity);
                            setPriceModal(true);
                          }}
                        >
                          <AntDesign name="minus" size={15} color="white" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#175E26",
                            padding: 3,
                          }}
                          onPress={() => {
                            setGood(e._id);
                            setPrice(e.price);
                            setQuantity(e.quantity);
                            setPriceModal(true);
                          }}
                        >
                          <AntDesign name="plus" size={15} color="white" />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        style={{
                          backgroundColor: "grey",
                          padding: 3,
                          marginLeft: 5,
                        }}
                        onPress={() =>
                          navigation.navigate("ProductDetailScreen", {
                            id: e._id,
                          })
                        }
                      >
                        <FontAwesome
                          name="angle-double-right"
                          size={15}
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
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        Үнэ
                      </Text>
                      <TextInput
                        placeholder="Үнэ"
                        keyboardType="numeric"
                        style={{
                          borderWidth: 1,
                          padding: 3,
                          borderColor: "#CCCCCC",
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
                        <Text style={styles.textStyle}>Болсон</Text>
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
    </View>
  );
};

export default ResultedProduct;

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
