import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ChooseCategoryModal = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("IncomeStaticScreen")}
        style={{
          backgroundColor: "#175E26",
          padding: 5,
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            padding: 5,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Категори дахь бүгдийг авах
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("IncomeStaticScreen")}
        style={{
          backgroundColor: "#175E26",
          padding: 5,
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            padding: 5,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Категори дахь хугацаагаар авах
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseCategoryModal;

const styles = StyleSheet.create({});
