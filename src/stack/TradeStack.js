import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MyBackButton from "../components/MyBackButton";
import ProfileScreen from "../screens/Auth/ProfileScreen";
import ProductDetailScreen from "../screens/List/ProductDetailScreen";
import ProductEditModal from "../screens/List/ProductEditModal";
import AddProductModal from "../screens/Trade/AddProductModal";
import PhotoByBasket from "../screens/Trade/PhotoByBasket";
import SearchByPhoto from "../screens/Trade/SearchByPhoto";
import TradePhotoScreen from "../screens/Trade/TradePhotoScreen";
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
        name="TradePhotoScreen"
        component={TradePhotoScreen}
        options={{}}
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Профайл",
          headerLeft: () => <MyBackButton />,
          headerShown: false,
        }}
      />
    </TradeStack.Navigator>
  );
};

export default TradeStack;
