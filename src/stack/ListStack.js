import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListScreen from "../screens/List/ListScreen";
import ProductDetailScreen from "../screens/List/ProductDetailScreen";
import MyBackButton from "../components/MyBackButton";
import ProductEditModal from "../screens/List/ProductEditModal";
import AddProductModal from "../screens/Trade/AddProductModal";
const ListStack = () => {
  const ListStack = createNativeStackNavigator();
  return (
    <ListStack.Navigator>
      <ListStack.Screen
        name="ListScreen"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <ListStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={{
          presentation: "formSheet",
          title: "Барааны дэлгэрэнгүй",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ListStack.Screen
        name="ProductEditModal"
        component={ProductEditModal}
        options={{
          presentation: "formSheet",
          title: "Бараа засах",
          headerLeft: () => <MyBackButton />,
        }}
      />
      <ListStack.Screen
        name="AddProductModal"
        component={AddProductModal}
        options={{
          presentation: "formSheet",
          title: "Бараа нэмэх",
          headerLeft: () => <MyBackButton />,
        }}
      />
    </ListStack.Navigator>
  );
};

export default ListStack;
