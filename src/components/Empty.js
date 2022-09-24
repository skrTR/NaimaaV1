import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Empty = ({ text }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/emptybox.png")}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ textAlign: "center" }}>{text} Хоосон байна</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
