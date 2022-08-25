import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PackageScreen from "../screens/Package/PackageScreen";
import FinanceScreen from "../screens/Finance/FinanceScreen";

const FinanceStack = () => {
  const FinanceStack = createNativeStackNavigator();
  return (
    <FinanceStack.Navigator>
      <FinanceStack.Screen
        name="FinanceScreen"
        component={FinanceScreen}
        options={{ headerShown: false }}
      />
    </FinanceStack.Navigator>
  );
};

export default FinanceStack;
