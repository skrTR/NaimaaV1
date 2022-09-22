import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
const LoginScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const login = () => {
    state.login(phone, password);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginTop: 100 }}>
            <Image
              source={require("../../../assets/logo.png")}
              style={{ width: 100, height: 43.4 }}
            />
          </View>
          <View style={{ marginHorizontal: 50, marginTop: 100 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Нэвтрэх</Text>
            <View style={{ marginVertical: 20 }}>
              <View>
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
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
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#175E26",
                padding: 10,
              }}
              onPress={login}
            >
              <Text style={{ color: "white" }}>Нэвтрэх</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 50, marginTop: 50 }}>
            <TouchableOpacity
              style={{ marginBottom: 20 }}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={{ fontWeight: "bold" }}>Нууц үг мартсан</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{ fontWeight: "bold" }}
                onPress={() => navigation.navigate("SignUpScreen")}
              >
                Бүртгүүлэх
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
