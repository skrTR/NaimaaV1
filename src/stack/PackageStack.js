import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PackageScreen from "../screens/Package/PackageScreen";
import PackageDetailScreen from "../screens/Package/PackageDetailScreen";
import MyBackButton from "../components/MyBackButton";

const PackageStack = () => {
  const PackageStack = createNativeStackNavigator();
  return (
    <PackageStack.Navigator>
      <PackageStack.Screen
        name="PackageScreen"
        component={PackageScreen}
        options={{ headerShown: false }}
      />
      <PackageStack.Screen
        name="PackageDetailScreen"
        component={PackageDetailScreen}
        options={{
          presentation: "formSheet",
          title: "Багц дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </PackageStack.Navigator>
  );
};

export default PackageStack;
