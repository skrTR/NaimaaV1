import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Spinner from "../../components/Spinner";
import moment from "moment";
const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [productData, setProductData] = useState([]);
  const [trans, setTrans] = useState([]);
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
    axios
      .get(`${api}/api/v1/transactions/user?good=${id}&sort=-createdAt`)
      .then((res) => {
        console.log(res.data.data);
        setTrans(res.data.data);
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
    <ScrollView>
      <View>
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
            marginHorizontal: 20,
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={styles.textTitle}>Нэр</Text>
            <Text style={styles.textTitle}>Категори</Text>
            <Text style={styles.textTitle}>Тоо ширхэг</Text>
            <Text style={styles.textTitle}>Үнэ(ш)</Text>
          </View>
          <View>
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
        <View>
          <Text></Text>
        </View>
      </View>
      {trans.map((e) => {
        return (
          <View key={e._id}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "#cccccc",
                marginTop: 10,
              }}
            />
            {e.type === "Орлого" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {e.type}
                  </Text>
                  <Text style={{ fontWeight: "300" }}>
                    {moment(e.createdAt).format("YYYY-MM-DD hh:mm")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <Text>{e.incomeType} </Text>
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    +{e.quantity}
                  </Text>
                </View>
                <Text style={{ textAlign: "right", marginRight: 10 }}>
                  үлдэгдэл: {e.balanceGoodNumber}{" "}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: "#cccccc",
                    marginTop: 10,
                  }}
                />
              </>
            )}
            {e.type === "Зарлага" && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {e.type}
                  </Text>
                  <Text style={{ fontWeight: "300" }}>
                    {moment(e.createdAt).format("YYYY-MM-DD hh:mm")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                  }}
                >
                  <Text>{e.incomeType} </Text>
                  <Text
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    -{e.quantity}
                  </Text>
                </View>
                <Text style={{ textAlign: "right", marginRight: 10 }}>
                  үлдэгдэл: {e.balanceGoodNumber}{" "}
                </Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: "#cccccc",
                    marginTop: 10,
                  }}
                />
              </>
            )}
          </View>
        );
      })}
    </ScrollView>
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
