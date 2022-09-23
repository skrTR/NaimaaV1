import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserContext from "../context/UserContex";

const SplashScreen = () => {
  const state = useContext(UserContext);
  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((data) => {
        if (data !== null) {
          const user = JSON.parse(data);
          state.setToken(user.token);
          state.setPhone(user.phone);
          state.setUserRole(user.userRole);
          state.setUserId(user.userId);
          state.setIsLoggedIn(true);
        }

        state.setIsLoading(false);
      })
      .catch((err) =>
        console.log("Токенийг утаснаас уншиж чадсангүй. Алдаа : " + err.message)
      );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="gray" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          top: 20,
        }}
      >
        Түр хүлээнэ үү...
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
