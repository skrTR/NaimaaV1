import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PackageScreen from "../screens/Package/PackageScreen";
import PackageDetailScreen from "../screens/Package/PackageDetailScreen";
import MyBackButton from "../components/MyBackButton";
import QpayModal from "../screens/Payment/QpayModal";
import DateExtendScreen from "../screens/Payment/DateExtendScreen";

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
      <PackageStack.Screen
        name="QpayModal"
        component={QpayModal}
        options={{
          presentation: "formSheet",
          title: "Qpay",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <PackageStack.Screen
        name="DateExtendScreen"
        component={DateExtendScreen}
        options={{
          presentation: "formSheet",
          title: "Хугацаа сунгах",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </PackageStack.Navigator>
  );
};

export default PackageStack;
