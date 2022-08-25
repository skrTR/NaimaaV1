import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import StandartHeader from "../../components/StandartHeader";
import UserContext from "../../context/UserContex";

const ProfileScreen = () => {
  const state = useContext(UserContext);
  console.log(state);
  const logout = () => {
    state.logout();
  };
  return (
    <>
      <StandartHeader />
      <TouchableOpacity
        onPress={logout}
        style={{
          padding: 20,
          alignSelf: "center",
          backgroundColor: "tomato",
          marginTop: 10,
        }}
      >
        <Text>Гарах</Text>
      </TouchableOpacity>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
