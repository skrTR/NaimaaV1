import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContex";
import axios from "axios";
import { api } from "../../../Constants";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
const RegisterScreen = () => {
  const state = useContext(UserContext);
  const getUserData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}`)
      .then((res) => {
        // console.log(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);
  const logout = () => {
    state.logout();
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      {/* Header */}
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/logo.png")}
          style={{ resizeMode: "contain", height: 50, width: 50 }}
        />
        <Ionicons name="md-notifications-outline" size={28} color="black" />
      </View>
      <View style={{ borderWidth: 1, borderColor: "#cccccccc" }} />
      <Image
        source={require("../../../assets/user.png")}
        style={{ width: 120, height: 100, alignSelf: "center", marginTop: 20 }}
        resizeMode={"contain"}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
          marginVertical: 10,
        }}
      >
        {state.phone}
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 10 }}>
        Үйлчилгээний хүчинтэй хугацаа:{" "}
        <Text style={{ fontWeight: "bold", color: "green" }}>2022-08-30</Text>
      </Text>
      <TouchableOpacity
        onPress={logout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <Ionicons name="call-outline" size={24} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 15 }}> Холбоо барих</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      />
      <TouchableOpacity
        onPress={logout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 15 }}> Гарах</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
