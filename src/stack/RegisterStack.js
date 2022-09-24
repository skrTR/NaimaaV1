import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyBackButton from "../components/MyBackButton";
import ResetPassword2 from "../screens/Auth/ResetPassword2";
import DateExtendScreen from "../screens/Payment/DateExtendScreen";
import QpayModal from "../screens/Payment/QpayModal";
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
      <RegisterStack.Screen
        name="ResetPassword2"
        component={ResetPassword2}
        options={{ headerShown: false }}
      />
      <RegisterStack.Screen
        name="QpayModal"
        component={QpayModal}
        options={{
          presentation: "formSheet",
          title: "Qpay",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <RegisterStack.Screen
        name="DateExtendScreen"
        component={DateExtendScreen}
        options={{
          presentation: "formSheet",
          title: "Хугацаа сунгах",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStack;
