import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContex";
import { useNavigation } from "@react-navigation/native";
const NormalHeader = () => {
  const state = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: "#175E26" }}>
      <View
        style={{
          marginHorizontal: 10,
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

export default NormalHeader;

const styles = StyleSheet.create({});
