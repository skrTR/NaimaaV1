import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyBackButton from "../components/MyBackButton";
import ProductDetailScreen from "../screens/List/ProductDetailScreen";
import ProductEditModal from "../screens/List/ProductEditModal";
import DateExtendScreen from "../screens/Payment/DateExtendScreen";
import QpayModal from "../screens/Payment/QpayModal";
import InventoryBarcodeScanner from "../screens/Register/InventoryBarcodeScanner";
import AddProductModal from "../screens/Trade/AddProductModal";
import PhotoByBasket from "../screens/Trade/PhotoByBasket";
import ResultBarcodeData from "../screens/Trade/ResultBarcodeData";
import SearchByPhoto from "../screens/Trade/SearchByPhoto";
import TradeScreen from "../screens/Trade/TradeScreen";

const TradeStack = () => {
  const TradeStack = createNativeStackNavigator();
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen
        name="TradeScreen"
        component={TradeScreen}
        options={{ headerShown: false }}
      />

      <TradeStack.Screen
        name="AddProductModal"
        component={AddProductModal}
        options={{
          presentation: "formSheet",
          title: "Бараа нэмэх",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="SearchByPhoto"
        component={SearchByPhoto}
        options={{
          presentation: "formSheet",
          title: "Зургаар хайх",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="PhotoByBasket"
        component={PhotoByBasket}
        options={{
          presentation: "formSheet",
          title: "Сагсанд хийх",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          presentation: "formSheet",
          title: "Барааны дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="ProductEditModal"
        component={ProductEditModal}
        options={{
          presentation: "formSheet",
          title: "Бараа засах",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="ResultBarcodeData"
        component={ResultBarcodeData}
        options={{
          presentation: "formSheet",
          title: "Баркодooр илэрсэн бараа",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="QpayModal"
        component={QpayModal}
        options={{
          presentation: "formSheet",
          title: "Qpay",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="DateExtendScreen"
        component={DateExtendScreen}
        options={{
          presentation: "formSheet",
          title: "Хугацаа сунгах",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <TradeStack.Screen
        name="InventoryBarcodeScanner"
        component={InventoryBarcodeScanner}
        options={{
          // presentation: "formSheet",
          title: "Хугацаа сунгах",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </TradeStack.Navigator>
  );
};

export default TradeStack;
