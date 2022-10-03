import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../context/UserContex";
import axios from "axios";
import { api } from "../../../Constants";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import * as Linking from "expo-linking";
const RegisterScreen = () => {
  const state = useContext(UserContext);
  const [deadLine, setDeadLine] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const getUserData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}`)
      .then((res) => {
        setDeadLine(res.data.data.deadline);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const userDelete = () => {
    Alert.alert("Та өөрийн профайл устгахдаа", "итгэлтэй байна уу?", [
      {
        text: "Болих",
        onPress: () => {
          console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      {
        text: "Устгах",
        onPress: () => {
          axios
            .delete(`${api}/api/v1/users/${state.userId}`)
            .then((res) => {
              state.logout();
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };
  useEffect(() => {
    getUserData();
  }, [isFocused]);
  const logout = () => {
    state.logout();
  };
  if (loading) {
    return <Loading />;
  }

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
        {/* <Ionicons name="md-notifications-outline" size={28} color="black" /> */}
      </View>
      <View style={{ borderWidth: 1, borderColor: "#cccccccc" }} />
      {/* Hereglegchiin huviin medeelel */}
      <Image
        source={require("../../../assets/user.png")}
        style={{
          width: 120,
          height: 100,
          alignSelf: "center",
          marginTop: 20,
        }}
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
        <Text style={{ fontWeight: "bold", color: "green" }}>
          {moment(deadLine).format("YYYY-MM-DD HH:mm")}
        </Text>
      </Text>
      {/* Hereglegchiin huviin medeelel duusah */}
      {/* Holboo barih */}
      <TouchableOpacity
        onPress={() => Linking.openURL("tel://+976 96660971 ")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <Ionicons name="call-outline" size={28} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 16 }}> Холбоо барих</Text>
      </TouchableOpacity>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      />
      {/* Holboo barih */}
      {/* Nuuts ug solih */}
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          axios
            .post(`${api}/api/v1/users/forgot-password`, {
              phone: state.phone,
            })
            .then((res) => {
              navigation.navigate("ResetPassword2", { phone: state.phone });
              setLoading(false);
            })
            .catch((err) => {
              Alert.alert(err.response.data.error.message);
              setLoading(false);
            });
          //
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <MaterialIcons name="security" size={24} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 15 }}> Нууц үг солих</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      />
      {/* Nuuts ug solih duusah */}
      {/* Qpay modal */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DateExtendScreen");
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <MaterialIcons name="attach-money" size={24} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 15 }}>Хугацаа сунгах</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      />
      {/* Qpay modal duusah*/}
      {/* логоут */}
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
          marginBottom: 10,
        }}
      />
      {/* Аккоунтаа устгах */}
      <TouchableOpacity
        onPress={userDelete}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
          alignContent: "center",
          marginBottom: 5,
        }}
      >
        <MaterialIcons name="restore-from-trash" size={24} color="black" />
        <Text style={{ fontWeight: "600", fontSize: 15 }}> Аккоунт устгах</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#cccccccc",
          marginHorizontal: 10,
          marginBottom: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
