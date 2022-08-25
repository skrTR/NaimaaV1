import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContex";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "#175E26", paddingBottom: 10 }}>
      <View
        style={{
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
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
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
