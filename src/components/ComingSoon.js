import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const ComingSoon = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
      }}
    >
      <Text
        style={{
          backgroundColor: "#c4c4c4",
          padding: 20,
          width: "100%",
          textAlign: "center",
          borderWidth: 1,
        }}
      >
        Тун удахгүй
      </Text>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "green",
    alignSelf: "stretch",
    alignItems: "center",
    heigth: 80, // this dose not change the header height
  },
  text: {
    //flex: 1,
    justifyContent: "center",
  },
});
