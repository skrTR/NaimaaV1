import { StyleSheet, Text, View, Image } from "react-native";
import React, { createRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
const Empty = ({ text }) => {
  let animation = createRef();
  useEffect(() => {
    animation.current.play();
  }, []);
  return (
    <View style={{ alignItems: "center", height: "100%" }}>
      <LottieView
        source={require("../../assets/customempty.json")}
        ref={animation}
        loop={true}
        style={{ height: 300, alignSelf: "center" }}
      />
      <Animatable.Text
        iterationCount={1}
        animation={"lightSpeedIn"}
        style={{
          textAlign: "center",
          marginTop: 10,
          fontWeight: "600",
          color: "green",
        }}
      >
        {text}
      </Animatable.Text>
      {/* <Text
        style={{ textAlign: "center", marginHorizontal: 40, marginTop: 20 }}
      >
        {text}
      </Text> */}
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
