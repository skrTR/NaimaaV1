import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { api } from "../../Constants";
import { useNavigation } from "@react-navigation/native";
const UserContext = React.createContext();
export const UserStore = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [phone, setPhone] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await axios.get(`${api}/api/v1/users/logout`);
    setIsLoggedIn(false);
    setToken(null);
    setPhone(null);
    setUserRole(null);
    setUserId(null);
  };

  const login = (phone, password) => {
    axios
      .post(`${api}/api/v1/users/login`, {
        phone: phone,
        password: password,
      })
      .then((result) => {
        loginUserSuccessful(
          result.data.token,
          phone,
          result.data.user.role,
          result.data.user._id
        );
      })
      .catch((err) => {
        loginFailed(err.message);
        console.log(err);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message = "Та интернэт холболтоо шалгана уу";
        else {
          message = err.response.data.error.message;
        }
        Alert.alert(message);
      });
  };

  const signUp = (phone, lastName, firstName, email, password) => {
    axios
      .post(`${api}/api/v1/users`, {
        phone: phone,
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
        role: "user",
      })
      .then((result) => {
        navigation.navigate("LoginScreen");
      })
      .catch((err) => {
        loginFailed(err.message);
        let message = err.message;
        console.log(err.response.data.error.message);
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message = "Та интернэт холболтоо шалгана уу";
        else if (
          err.response.data.error.message ===
          "Энэ талбарын утгыг давхардуулж өгч болохгүй!"
        ) {
          message = "Утасны дугаар бүртгүүлсэн байна.";
        } else {
          message = err.message;
        }
        Alert.alert(message);
      });
  };

  const loginFailed = (error) => {
    console.log(error);
    setIsLoggedIn(false);
    setPhone(null);
    setUserRole(null);
    setUserId(null);
  };

  const loginUserSuccessful = async (token, phone, userRole, userId) => {
    setToken(token);
    setPhone(phone);
    setUserRole(userRole);
    setUserId(userId);

    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ token, phone, userRole, userId })
      );
    } catch (err) {
      console.log("Утас руу хадгалж чадсангүй...");
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login,
        userRole,
        phone,
        signUp,
        logout,
        isLoading,
        setIsLoading,
        setPhone,
        setUserRole,
        userId,
        setUserId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
