import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Empty = ({ text }) => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/emptybox.png")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ textAlign: "center" }}>{text} Хоосон байна</Text>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
