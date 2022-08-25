import { StyleSheet, Text, TouchableOpacity, Modal, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
const TradeCategory = (props) => {
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const { categoryModal, setCategoryModal } = props;
  const getCategory = () => {
    axios
      .get(`${api}/api/v1/categories`)
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#C4C4C4",
          flexDirection: "row",
          alignItems: "center",
          width: "30%",
        }}
        onPress={() => setCategoryModal(true)}
      >
        <Text style={{ color: "#c4c4c4", padding: 10 }}>
          {category ? category : "Категори"}
        </Text>
        <Entypo name="chevron-thin-down" size={15} color={"#c4c4c4"} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModal}
        onRequestClose={() => {
          setCategoryModal(!categoryModal);
        }}
      >
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginVertical: 20,
                  fontSize: 18,
                }}
              >
                Категори сонгох
              </Text>
              {categoryData.map((e) => {
                <TouchableOpacity
                  onPress={() => {
                    setCategory(e.name);
                    setCategoryModal(false);
                  }}
                  key={e._id}
                >
                  <Text style={styles.categoryText}>{e.name}1!!!</Text>
                  <View style={styles.borderLine} />
                </TouchableOpacity>;
              })}
            </View>
            <TouchableOpacity
              onPress={() => setCategoryModal(!categoryModal)}
              style={{ position: "absolute", margin: 20, right: 0 }}
            >
              <Ionicons name="backspace-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TradeCategory;

const styles = StyleSheet.create({
  centeredView1: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "40%",
  },
  modalView1: {
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  productText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  borderLine: {
    borderWidth: 0.45,
    borderColor: "#CCCCCC",
    marginVertical: 5,
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
  categoryText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 20,
    marginTop: 5,
  },
});
