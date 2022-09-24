import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChooseModal = (props) => {
  const navigation = useNavigation();
  const { type } = props.route.params;
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#175E26",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate("ReportDateModal", { type });
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
        >
          Хугацаагаар
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#175E26",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate("ChooseCategoryModal", { type });
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
        >
          Категори-оор
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseModal;

const styles = StyleSheet.create({});
