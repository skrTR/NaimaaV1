import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    state.login(phone, password);
  };
  return (
    <SafeAreaView>
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
              placeholder="Нууц үг"
              placeholderTextColor={"black"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: "#175E26",
                marginVertical: 5,
              }}
            />
          </View>
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
        <TouchableOpacity style={{ marginBottom: 20 }}>
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
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
