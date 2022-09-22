import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign, Entypo } from "@expo/vector-icons";
const ResetPassword2 = (props) => {
  const navigation = useNavigation();
  const { phone } = props.route.params;
  const [random, setRandom] = useState();
  const [counter, setCounter] = useState(59);
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);
  const signUpHandler = () => {
    if (password !== password1) {
      alert("Нууц үг таарахгүй байна");
    }
    axios
      .post(`${api}/api/v1/users/reset-password`, {
        password: password1,
        resetToken: random,
      })
      .then((res) => {
        navigation.navigate("AfterLoginScreen", {
          SignPhone: phone,
          SignPassword: password,
        });
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(err.response.data.error.message);
      });
  };
  const sendMessage = () => {
    axios
      .post(`${api}/api/v1/users/forgot-password`, { phone: phone })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(err.response.data.error.message);
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
            fontSize: 20,
            color: "#175E26",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Нууц үг сэргээх
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#175E26",
            textAlign: "center",
            marginTop: 10,
            marginHorizontal: 20,
          }}
        >
          Таны оруулсан <Text>{phone}</Text> дугаар луу 4 оронтой код явуулсан.
          Тэр кодыг та доорх 4 нүхэнд хийгээд өөрийн шинэ нууц үгээ үүсгээд
          илгээх дархад таны нууц үг өөрчлөгдөх болн
        </Text>
        <View
          style={{
            marginTop: 20,
            bottom: 20,
            marginHorizontal: 20,
            height: 150,
          }}
        >
          <OTPInputView
            pinCount={4}
            code={random}
            onCodeChanged={(val) => setRandom(val)}
            autoFocusOnLoad
            onCodeFilled={(code) => {}}
            codeInputFieldStyle={{ color: "#175E26", borderRadius: 10 }}
            codeInputHighlightStyle={{
              borderColor: "#175E26",
              borderRadius: 10,
            }}
          />
          {counter > 0 ? (
            <Text style={{ textAlign: "right", marginRight: 10 }}>
              {" "}
              Дахин мессеж илгээх 00:{counter}{" "}
            </Text>
          ) : (
            <TouchableOpacity
              style={{
                marginRight: 10,
                backgroundColor: "#175E26",
                alignSelf: "flex-end",
                padding: 10,
                borderRadius: 10,
                marginBottom: 40,
              }}
              onPress={() => {
                sendMessage();
                setCounter(59);
              }}
            >
              <Text style={{ textAlign: "right", color: "white" }}>
                Дахин мессеж илгээх
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                placeholder="Нууц үг *"
                placeholderTextColor={"black"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isSecure}
                style={{ flex: 1, fontSize: 16 }}
              />
              <TouchableOpacity
                style={{ position: "absolute", padding: 15, right: 0 }}
                onPress={() => setIsSecure(!isSecure)}
              >
                <Entypo
                  name={isSecure ? "eye" : "eye-with-line"}
                  size={24}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#175E26",
                marginVertical: 5,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TextInput
                placeholder="Нууц үг давтан хийнэ үү *"
                placeholderTextColor={"black"}
                value={password1}
                onChangeText={setPassword1}
                secureTextEntry={isSecure}
                style={{ flex: 1, fontSize: 16 }}
              />
              <TouchableOpacity
                style={{ position: "absolute", padding: 15, right: 0 }}
                onPress={() => setIsSecure(!isSecure)}
              >
                <Entypo
                  name={isSecure ? "eye" : "eye-with-line"}
                  size={24}
                  color={"black"}
                />
              </TouchableOpacity>
            </View>
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
              backgroundColor: "#175E26",
              top: 45,
              padding: 5,
              borderRadius: 20,
            }}
            onPress={signUpHandler}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
              }}
            >
              Илгээх
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 500 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword2;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
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
