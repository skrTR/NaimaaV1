import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import axios from "axios";
import { api } from "../../../Constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import moment from "moment";
const SignUpScreen2 = (props) => {
  const navigation = useNavigation();
  const { firstName, lastName, phone, password, email } = props.route.params;
  const [random, setRandom] = useState();
  const [counter, setCounter] = useState(59);
  const date1 = moment().add(1, "months").format();
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const signUpHandler = () => {
    axios
      .post(`${api}/api/v1/users`, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
        random: random,
        deadline: date1,
      })
      .then((res) => {
        navigation.navigate("AfterLoginScreen", {
          SignPhone: phone,
          SignPassword: password,
        });
      })
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
      });
  };
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/users/send`, { phone: phone })
      .then((res) => {})
      .catch((err) => {
        Alert.alert(err.response.data.error.message);
        navigation.goBack();
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <AntDesign
        name="left"
        color={"#175E26"}
        size={33}
        style={{ margin: 20, top: 30 }}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/ioslogo.png")}
          style={{
            height: 150,
            width: "90%",
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontSize: 18,
            color: "#175E26",
            textAlign: "center",
          }}
        >
          Хэрэглэгч баталгаажуулах
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "#175E26",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Таны оруулсан <Text>{phone}</Text> дугаар луу 4 оронтой код явуулсан.
        </Text>
        <View
          style={{ flex: 1, marginTop: 20, bottom: 20, marginHorizontal: 20 }}
        >
          <OTPInputView
            pinCount={4}
            code={random}
            onCodeChanged={(val) => setRandom(val)}
            autoFocusOnLoad
            onCodeFilled={(code) => {}}
            codeInputFieldStyle={{ color: "#175E26" }}
            codeInputHighlightStyle={{
              borderColor: "#175E26",
              borderRadius: 10,
            }}
          />
          {counter > 0 ? (
            <Text
              style={{
                textAlign: "right",
                marginRight: 10,
                paddingBottom: 100,
              }}
            >
              {" "}
              Дахин мессеж илгээх 00:{counter}{" "}
            </Text>
          ) : (
            <Text
              style={{
                textAlign: "right",
                marginRight: 10,
                paddingBottom: 100,
              }}
              onPress={() => {
                sendMessage();
                setCounter(59);
              }}
            >
              Дахин мессеж илгээх
            </Text>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: "#175E26",
          padding: 10,
          marginTop: 20,
          borderRadius: 20,
          marginBottom: 10,
        }}
        onPress={signUpHandler}
      >
        <Text style={{ color: "white" }}>Бүртгүүлэх</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen2;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#175E26",
    fontWeight: "600",
  },

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
