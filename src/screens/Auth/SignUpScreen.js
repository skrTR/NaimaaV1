import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { api } from "../../../Constants";
const SignUpScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [reading, setReading] = useState(false);
  const [phone, setPhone] = useState("95040448");
  const [password, setPassword] = useState("123456");
  const [password1, setPassword1] = useState("123456");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("gg@gg.com");
  const [isSecure, setIsSecure] = useState(true);
  const login = () => {
    if (phone.length < 6) {
      Alert.alert("Та утасны дугаараа бичнэ үү");
      return;
    }
    if (password !== password1) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна");
      return;
    }
    if (password.length < 4) {
      Alert.alert("Нууц үг хамгийн багадаа 4 оронтой байна");
      return;
    }
    if (!reading) {
      Alert.alert("Үйлчилгээний нөхцөл зөвшөөрнө үү");
      return;
    }

    navigation.navigate("SignUpScreen2", {
      firstName,
      lastName,
      email,
      phone,
      password,
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <AntDesign
          name="left"
          color={"#175E26"}
          size={33}
          style={{ margin: 20 }}
          onPress={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/logo.png")}
              style={{ width: 100, height: 43.4 }}
            />
          </View>
          <View style={{ marginHorizontal: 50, marginTop: 100 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Бүртгүүлэх</Text>
            <View style={{ marginVertical: 20 }}>
              <View>
                <TextInput
                  placeholder="Утасны дугаар *"
                  placeholderTextColor={"black"}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType={"number-pad"}
                  style={styles.textInputFont}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#175E26",
                    marginVertical: 5,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="И-мэйл"
                  placeholderTextColor={"black"}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.textInputFont}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#175E26",
                    marginVertical: 5,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Овог"
                  placeholderTextColor={"black"}
                  value={lastName}
                  onChangeText={setLastName}
                  style={styles.textInputFont}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#175E26",
                    marginVertical: 5,
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <TextInput
                  placeholder="Hэр"
                  placeholderTextColor={"black"}
                  value={firstName}
                  onChangeText={setFirstName}
                  style={styles.textInputFont}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#175E26",
                    marginVertical: 5,
                  }}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    placeholder="Нууц үг *"
                    placeholderTextColor={"black"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={isSecure}
                    style={[styles.textInputFont, { flex: 1 }]}
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
                    marginTop: 10,
                  }}
                >
                  <TextInput
                    placeholder="Нууц үг давтан хийнэ үү *"
                    placeholderTextColor={"black"}
                    value={password1}
                    onChangeText={setPassword1}
                    secureTextEntry={isSecure}
                    style={[styles.textInputFont, { flex: 1 }]}
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
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setReading(true)}
              >
                <MaterialCommunityIcons
                  name={
                    reading ? "checkbox-intermediate" : "checkbox-blank-outline"
                  }
                  size={24}
                  color="black"
                />
                <Text>{"Зөвшөөрсөн"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => setReading(false)}
              >
                <MaterialCommunityIcons
                  name={
                    !reading
                      ? "checkbox-intermediate"
                      : "checkbox-blank-outline"
                  }
                  size={24}
                  color="black"
                />
                <Text>{"Зөвшөөрөөгүй"}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#175E26",
                padding: 10,
              }}
              onPress={() => {
                login();
                sendMessage();
              }}
            >
              <Text style={{ color: "white" }}>Бүртгүүлэх</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontSize: 16, textAlign: "center", marginVertical: 20 }}
          >
            Хэрэв бүртгэл байгаа бол
          </Text>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#add8e6",
              padding: 10,
              marginHorizontal: 50,
            }}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={{ color: "black" }}>Нэвтрэх</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  textInputFont: {
    fontSize: 16,
  },
});
