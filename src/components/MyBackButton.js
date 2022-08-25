import { View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
const MyBackButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <AntDesign
        name="left"
        size={24}
        color={"black"}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default MyBackButton;
