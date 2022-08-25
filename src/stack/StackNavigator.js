import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TradeStack from "./TradeStack";
import ReportStack from "./ReportStack";
import PackageStack from "./PackageStack";
import RegisterStack from "./RegisterStack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import UserContext from "../context/UserContex";
import ListStack from "./ListStack";
import SplashScreen from "../screens/SplashScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const state = useContext(UserContext);
  if (state.isLoading === true) {
    return <SplashScreen />;
  }
  return (
    <>
      {state.isLoggedIn ? (
        <Tab.Navigator
          initialRouteName="Ажил хийе"
          // sceneContainerStyle={{ backgroundColor: colors.background }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Наймаа") {
                iconName = focused ? "exchange" : "exchange";
              } else if (route.name === "Тайлан") {
                iconName = focused ? "sort-numeric-asc" : "sort-numeric-asc";
              } else if (route.name === "Бараа") {
                iconName = focused ? "th-list" : "th-list";
              } else if (route.name === "Багц") {
                iconName = focused ? "sitemap" : "sitemap";
              } else if (route.name === "Бүртгэл") {
                iconName = focused ? "users" : "users";
              }
              // You can return any component that you like here!
              return <FontAwesome name={iconName} size={20} color={color} />;
            },
            tabBarActiveTintColor: "#FF9B05",
            tabBarInactiveTintColor: "white",
            tabBarStyle: { backgroundColor: "#175E26" },
            tabBarLabelStyle: { fontWeight: "bold" },
          })}
        >
          <Tab.Screen
            name="Наймаа"
            component={TradeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Бараа"
            component={ListStack}
            options={{ headerShown: false }}
          />

          <Tab.Screen
            name="Тайлан"
            component={ReportStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Багц"
            component={PackageStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Бүртгэл"
            component={RegisterStack}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
