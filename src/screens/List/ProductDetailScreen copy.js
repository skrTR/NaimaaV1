import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "../../components/Spinner";
const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [productData, setProductData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${api}/api/v1/goods/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setProductData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteProduct = () => {
    Alert.alert(
      `Та ${productData.name} нэртэй барааг устгахдаа итгэлтэй байна уу`,
      "",
      [
        {
          text: "Үгүй",
          style: "cancel",
        },
        {
          text: "Тийм",
          onPress: () => {
            setLoading(true);
            axios
              .delete(`${api}/api/v1/goods/${id}`)
              .then((res) => {
                setLoading(false);
                navigation.goBack();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Image
            source={
              productData.photo === "no-photo.jpg"
                ? require("../../../assets/logo.png")
                : { uri: `${api}/upload/${productData.photo}` }
            }
            style={{ width: 150, height: 150 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>Нэр</Text>
            <Text style={styles.textTitle}>Категори</Text>
            <Text style={styles.textTitle}>Тоо ширхэг</Text>
            <Text style={styles.textTitle}>Үнэ(ш)</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.textTitle1}>{productData.name}</Text>
            <Text style={styles.textTitle1}>
              {productData.category && productData.category.name
                ? productData.category.name
                : "Хоосон"}
            </Text>
            <Text style={styles.textTitle1}>
              {productData.quantity} {productData.unit}
            </Text>
            <Text style={styles.textTitle1}>{productData.price}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/barcode.png")}
              style={{ height: 100, width: 100 }}
            />
            <Text>{productData.barCode}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() =>
                navigation.navigate("ProductEditModal", { data: productData })
              }
            >
              <Text style={styles.textTitle}>Засах</Text>
              <AntDesign name="edit" size={24} color="#c4c4c4" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={deleteProduct}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "red" }}>
                Устгах
              </Text>
              <AntDesign name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c4c4c4",
  },
  textTitle1: {
    fontSize: 16,
    fontWeight: "600",
  },
});
