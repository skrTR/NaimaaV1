import { Animated, View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useEffect, useContext, useState } from "react";
import LottieView from "lottie-react-native";
import NormalHeader from "../../components/NormalHeader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContex";
import axios from "axios";
import { api } from "../../../Constants";
import moment from "moment";

const PaymentScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const [data, setData] = useState([]);

  const getUserData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}?select=deadline`)
      .then((res) => {
        setData(res.data.data.deadline);
      })
      .catch((err) => {
        let message = err.response.data.error.message;
        if (message === `${state.userId} ID-тэй хэрэглэгч байхгүй!`) {
          state.logout();
        }
      });
  };
  const logout = () => {
    state.logout();
  };
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    getUserData();
  }, [isFocused]);
  if (!data) {
    return null;
  }
  return (
    <>
      <NormalHeader />
      <View style={{ alignItems: "center" }}>
        <LottieView
          source={require("../../../assets/shield.json")}
          style={{
            width: "100%",
            height: 400,
          }}
          autoPlay
          loop
          ref={(animation) => {
            if (animation) animation.play();
          }}
          progress={progress}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Үйлчилгээний хугацаа дууссан :{" "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: data ? "red" : "green",
            }}
          >
            {moment(data).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#175E26",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate("DateExtendScreen");
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
        >
          Үйлчилгээ сунгах
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#175E26",
          padding: 10,
          marginHorizontal: 20,
          borderRadius: 50,
          marginTop: 20,
        }}
        onPress={logout}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
        >
          Аккоунтаас гарах
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PaymentScreen;
