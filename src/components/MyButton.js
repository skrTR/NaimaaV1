import { Text, TouchableOpacity } from "react-native";
import React from "react";

const MyButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#175E26",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 10,
      }}
      {...props}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>
        PDF лүү хөрвүүлэх
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;
