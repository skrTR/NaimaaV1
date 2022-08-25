import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/stack/StackNavigator";
import { UserStore } from "./src/context/UserContex";
import "moment/locale/mn";
const App = () => {
  return (
    <NavigationContainer>
      <UserStore>
        <StackNavigator />
      </UserStore>
    </NavigationContainer>
  );
};

export default App;
