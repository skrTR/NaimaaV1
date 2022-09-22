import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
const ResetPassword = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/users/forgot-password`, { phone: phone })
      .then((res) => {
        setMessage(res.data.success);
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView style={{ flex: 1 }}>
        <AntDesign
          name="left"
          size={30}
          color="#175E26"
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={require("../../../assets/ioslogo.png")}
          style={{
            width: "90%",
            height: 220,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            marginVertical: 20,
            color: "#175E26",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Та өөрийн бүртгэлтэй утасны дугаараа оруулж нууц үгээ сэргээх
          боломжтой
        </Text>
        <View style={{ top: 10, marginHorizontal: 20 }}>
          <TextInput
            placeholder="Утасны дугаар"
            placeholderTextColor={"black"}
            value={phone}
            onChangeText={setPhone}
            style={{ fontSize: 16 }}
            keyboardType={"number-pad"}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: "#175E26",
              marginVertical: 5,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            top: 5,
            alignItems: "center",
            backgroundColor: "#175E26",
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 20,
            marginTop: 20,
          }}
          onPress={() => {
            if (phone.length < 5) {
              return alert("Та утасны дугаараа оруулна уу");
            }
            sendMessage();
            navigation.navigate("ResetPassword2", {
              phone: phone,
            });
          }}
        >
          <Text style={{ color: "white" }}>Сэргээх</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
});
