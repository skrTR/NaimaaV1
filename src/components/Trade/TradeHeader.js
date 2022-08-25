import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";

const TradeHeader = ({ enabled, changeEnabled }) => {
  const state = useContext(UserContext);
  const navigation = useNavigation("ProfileScreen");
  return (
    <View
      style={{
        backgroundColor: "#175E26",
        paddingTop: 40,
      }}
    >
      {/* Logo and number */}
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{ resizeMode: "contain", height: 50, width: 50 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", marginRight: 20 }}
            >
              {state.phone}
            </Text>
          </TouchableOpacity>
          <Ionicons name="md-notifications-outline" size={24} color="white" />
        </View>
      </View>
      {/* Orlogo zarlaga */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => changeEnabled(false)}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Орлого
          </Text>
          {!enabled && (
            <View
              style={{
                borderWidth: 3,
                borderColor: "#FF9B05",
                width: "200%",
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => changeEnabled(true)}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Зарлага
          </Text>
          {enabled && (
            <View
              style={{
                borderWidth: 3,
                borderColor: "#FF9B05",
                width: "200%",
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TradeHeader;

const styles = StyleSheet.create({});
