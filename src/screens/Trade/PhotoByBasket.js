import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation } from "@react-navigation/native";

const PhotoByBasket = (props) => {
  const { data } = props.route.params;
  const navigation = useNavigation();
  const [form, setForm] = useState({
    good: data._id,
    quantity: null,
    price: null,
  });

  const goBasket = () => {
    axios
      .post(`${api}/api/v1/transactions`, form)
      .then((res) => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkPrice = (text) => {
    setForm({
      ...form,
      price: text,
    });
  };
  const checkQuantity = (text) => {
    setForm({
      ...form,
      quantity: text,
    });
  };
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: `${api}/upload/${data.photo}` }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{data.name}</Text>
          <Text>Танд байгаа хэмжээ: {data.quantity}</Text>
          <Text>Таны оруулсан үнэ: {data.price}</Text>
        </View>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 10,
        }}
      >
        Хэмжээ
      </Text>
      <TextInput
        placeholder="Хэмжээ"
        style={{
          borderWidth: 1,
          padding: 3,
          borderColor: "#CCCCCC",
        }}
        placeholderTextColor={"grey"}
        value={form.quantity}
        onChangeText={checkQuantity}
      />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 10,
        }}
      >
        Үнэ
      </Text>
      <TextInput
        placeholder="Үнэ"
        style={{
          borderWidth: 1,
          padding: 3,
          borderColor: "#CCCCCC",
        }}
        placeholderTextColor={"grey"}
        value={form.price}
        onChangeText={checkPrice}
      />
      <TouchableOpacity
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          goBasket();
        }}
      >
        <Text style={styles.textStyle}>Болсон</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhotoByBasket;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: "#175E26",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
