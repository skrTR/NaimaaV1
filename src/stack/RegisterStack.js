import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import RegisterScreen from "../screens/Register/RegisterScreen";

const RegisterStack = () => {
  const RegisterStack = createNativeStackNavigator();
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStack;
