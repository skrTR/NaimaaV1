import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";

const Loading = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <LottieView
        source={require("../../assets/car.json")}
        style={{
          width: "100%",
          height: 400,
        }}
        ref={(animation) => {
          if (animation) animation.play();
        }}
        progress={progress}
      />
      <Animatable.Text
        iterationCount={"infinite"}
        animation={"pulse"}
        style={{
          textAlign: "center",
          fontSize: 40,
          marginTop: 10,
          fontWeight: "600",
          color: "green",
        }}
      >
        Та түр хүлээнэ үү.....
      </Animatable.Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
