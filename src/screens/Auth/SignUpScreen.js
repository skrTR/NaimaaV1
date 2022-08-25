import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserContext from "../../context/UserContex";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
const SignUpScreen = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();
  const [reading, setReading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
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
    state.signUp(phone, lastName, firstName, email, password);
  };
  return (
    <SafeAreaView>
      <AntDesign
        name="back"
        color={"black"}
        size={33}
        style={{ position: "absolute", margin: 20, top: 30 }}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 100 }}>
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
                placeholder="Нууц үг *"
                placeholderTextColor={"black"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
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
                placeholder="Нууц үг давтан хийнэ үү *"
                placeholderTextColor={"black"}
                value={password1}
                onChangeText={setPassword1}
                secureTextEntry
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
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setReading(!reading)}
          >
            <MaterialCommunityIcons
              name={
                reading ? "checkbox-intermediate" : "checkbox-blank-outline"
              }
              size={24}
              color="black"
            />
            <Text>{reading ? "Зөвшөөрсөн" : "Зөвшөөрөөгүй"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#175E26",
              padding: 10,
            }}
            onPress={login}
          >
            <Text style={{ color: "white" }}>Бүртгүүлэх</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 50, marginTop: 30 }}>
          <TouchableOpacity>
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Нэвтрэх
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
