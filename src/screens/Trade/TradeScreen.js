import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import UserContext from "../../context/UserContex";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IncomeScreen from "./IncomeScreen";
import OutcomeScreen from "./OutcomeScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { api } from "../../../Constants";
import PaymentScreen from "../Payment/PaymentScreen";
const TradeScreen = () => {
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const isFocused = useIsFocused();
  const Tab = createMaterialTopTabNavigator();
  const insents = useSafeAreaInsets();
  const [time, setTime] = useState([]);
  const getUserData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}`)
      .then((res) => {
        setTime(res.data.time);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    getUserData();
  }, [isFocused]);
  return (
    <>
      {time ? (
        <View
          style={{
            height: "100%",
          }}
        >
          {/* header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#175E26",
              paddingTop: insents.top,
            }}
          >
            <Image
              source={require("../../../assets/logo.png")}
              style={{
                resizeMode: "contain",
                height: 50,
                width: 50,
                marginLeft: 20,
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    marginRight: 20,
                  }}
                >
                  {state.phone}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: "#175E26" },
              tabBarLabelStyle: {
                color: "white",
                fontWeight: "bold",
                fontSize: 13,
              },
              tabBarIndicatorStyle: {
                backgroundColor: "#FF9B05",
                paddingVertical: 2,
              },
            }}
          >
            <Tab.Screen name="Орлого" component={IncomeScreen} />
            <Tab.Screen name="Зарлага" component={OutcomeScreen} />
          </Tab.Navigator>
        </View>
      ) : (
        <PaymentScreen />
      )}
    </>
  );
};

export default TradeScreen;

const styles = StyleSheet.create({});
