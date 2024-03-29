import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation } from "@react-navigation/native";
import CategoryModal from "../../components/Trade/AddProduct/CategoryModal";
import QuantityModal from "../../components/Trade/AddProduct/QuantityModal";
import CameraModal from "../../components/Trade/AddProduct/CameraModal";
import BarcodeModal from "../../components/Trade/AddProduct/BarcodeModal";
import Loading from "../../components/Loading";
const AddProductModal = () => {
  const navigation = useNavigation();
  const [productImage, setProductImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [quantityModal, setQuantityModal] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [productQuantity, setProductQuantity] = useState("");
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [productNote, setProductNote] = useState("");
  const [goBasket, setGoBasket] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  useEffect(() => {
    axios
      .get(`${api}/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);
  const sendData = () => {
    setLoader(true);
    axios
      .post(`${api}/api/v1/goods`, {
        name: productName,
        category: categoryId,
        price: productPrice,
        barCode: barcode,
        unit: productQuantity,
      })
      .then((res) => {
        const newPost = res.data.data;
        if (productImage) {
          const xhr = new XMLHttpRequest();
          const fileExt = productImage.substring(
            productImage.lastIndexOf(".") + 1
          );
          xhr.addEventListener("load", (event) => handleUploadComplete(event));
          xhr.upload.addEventListener("progress", handleUploadProgress);
          const formData = new FormData();
          formData.append("file", {
            uri: productImage,
            type: `image/${fileExt}`,
            name: `new__profile.${fileExt}`,
          });
          xhr.open("PUT", `${api}/api/v1/goods/${newPost._id}/upload-photo`);
          xhr.send(formData);
        }
        setLoader(false);
        navigation.goBack();
      });
  };
  const sendDataWithBasket = () => {
    setLoader(true);
    axios
      .post(`${api}/api/v1/goods`, {
        name: productName,
        category: categoryId,
        price: productPrice,
        barCode: barcode,
        unit: productQuantity,
      })
      .then((res) => {
        const newPost = res.data.data;
        if (productImage) {
          const xhr = new XMLHttpRequest();
          const fileExt = productImage.substring(
            productImage.lastIndexOf(".") + 1
          );
          xhr.addEventListener("load", (event) => handleUploadComplete(event));
          xhr.upload.addEventListener("progress", handleUploadProgress);
          const formData = new FormData();
          formData.append("file", {
            uri: productImage,
            type: `image/${fileExt}`,
            name: `new__profile.${fileExt}`,
          });
          xhr.open("PUT", `${api}/api/v1/goods/${newPost._id}/upload-photo`);
          xhr.send(formData);
        }
        axios
          .post(`${api}/api/v1/transactions`, {
            good: newPost._id,
            price: newPost.price,
            quantity: quantity,
          })
          .then((res) => {
            // console.log(res.data.data, "in");
          })
          .catch((err) => {
            //console.log(err);
          });
        setLoader(false);
        navigation.goBack();
      });
  };
  const productCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
      });
      if (!response.cancelled) {
        setProductImage(response.uri);
        setCameraModal(false);
      }
    }
  };
  const openProductImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("zurgiin erhiig neene uu");
    }
    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!response.cancelled) {
        setProductImage(response.uri);
        setCameraModal(false);
      }
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Баркод амжилттай уншигдлаа", `${data} таны уншуулсан баркод`, [
      {
        text: "Дахин уншуулах",
        onPress: () => setScanned(false),
        style: "cancel",
      },
      {
        text: "Болсон",
        onPress: () => {
          setBarcode(data);
          setModalVisible(false);
        },
      },
    ]);
  };

  const handleUploadComplete = () => {
    setUploadProgress(0);
    setUploadTotal(0);
  };
  const handleUploadProgress = (event) => {
    if (uploadTotal === 0) setUploadTotal(event.total);

    setUploadProgress((uploadProgress) => {
      return Math.round((event.loaded * 100) / event.total);
    });
  };
  if (hasPermission === null) {
    return <Text>Та зураг дарах авах эрхийг нээнэ үү!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Та зураг дарах авах эрхийг хаасан байна</Text>;
  }
  if (uploadTotal > 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}>
          Түр хүлээнэ үү. Зургийг илгээж байна...
        </Text>

        <View
          style={{
            height: 50,
            backgroundColor: "red",
            width: 200,
          }}
        >
          <View
            style={{
              height: 50,
              backgroundColor: "green",
              width: uploadProgress * 2,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", flex: 1, marginTop: 15 }}>
              {uploadProgress}%
            </Text>
          </View>
        </View>
      </View>
    );
  }
  if (loader) {
    return <Loading />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView
        style={{
          margin: 20,
          flex: 1,
          opacity: modalVisible
            ? 0.1
            : cameraModal
            ? 0.1
            : categoryModal
            ? 0.1
            : quantityModal
            ? 0.1
            : 1,
        }}
      >
        <Text style={styles.titleText}>Категори</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => setCategoryModal(true)}
        >
          {categoryName ? (
            <Text style={{ padding: 5, fontSize: 16 }}>{categoryName}</Text>
          ) : (
            <Text style={{ padding: 5, color: "grey", fontSize: 16 }}>
              Категори сонгох
            </Text>
          )}

          <Entypo
            name="chevron-thin-down"
            size={16}
            color={"grey"}
            style={{ right: 5 }}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Бараа нэр</Text>
        <TextInput
          placeholder="Бүтээгдэхүүний нэр"
          style={{ borderWidth: 1, padding: 5, fontSize: 16 }}
          placeholderTextColor={"grey"}
          value={productName}
          onChangeText={setProductName}
        />
        <Text style={styles.titleText}>Үнэ</Text>
        <TextInput
          placeholder="Үнийн дүнгээ бичнэ үү"
          placeholderTextColor={"grey"}
          style={{ borderWidth: 1, padding: 5, fontSize: 16 }}
          value={`${productPrice}`}
          onChangeText={setProductPrice}
        />
        <Text style={styles.titleText}>Хэмжих нэгж</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => setQuantityModal(true)}
        >
          {productQuantity ? (
            <Text style={{ padding: 5, fontSize: 16 }}>{productQuantity}</Text>
          ) : (
            <Text style={{ padding: 5, color: "grey", fontSize: 16 }}>
              Хэмжих нэгж сонгоно уу
            </Text>
          )}

          <Entypo
            name="chevron-thin-down"
            size={16}
            color={"grey"}
            style={{ right: 5 }}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Тэмдэглэл</Text>
        <TextInput
          multiline
          numberOfLines={10}
          placeholder={"Тэмдэглэл"}
          style={{ borderWidth: 1, padding: 5, fontSize: 16 }}
          value={productNote}
          onChangeText={setProductNote}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "#c4c4c4",
              flex: 0.5,
              margin: 5,
            }}
            onPress={() => setCameraModal(true)}
          >
            {productImage ? (
              <Image
                source={{ uri: productImage }}
                style={{ width: 100, height: 100, resizeMode: "contain" }}
              />
            ) : (
              <View style={{ alignItems: "center", padding: 30 }}>
                <Entypo name="camera" size={24} color="black" />
                <Text>Зураг оруулах</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#c4c4c4",
              flex: 0.5,
              margin: 5,
              alignItems: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            {scanned ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../../assets/barcode.png")}
                  style={{ resizeMode: "contain", height: 40, width: 40 }}
                />
                <Text>{barcode}</Text>
              </View>
            ) : (
              <View style={{ alignItems: "center", padding: 28 }}>
                <Entypo name="camera" size={24} color="black" />
                <Text>Баркод оруулах</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setGoBasket(false)}
          >
            <MaterialCommunityIcons
              name={
                goBasket ? "checkbox-blank-outline" : "checkbox-intermediate"
              }
              size={24}
              color="black"
            />
            <Text>Сагсанд шууд хийхгүй</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGoBasket(true)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name={
                !goBasket ? "checkbox-blank-outline" : "checkbox-intermediate"
              }
              size={24}
              color="black"
            />
            <Text>Сагсанд шууд хийх</Text>
          </TouchableOpacity>
        </View>
        {goBasket && (
          <>
            <Text style={styles.titleText}>Тоо ширхэг</Text>
            <TextInput
              placeholder="Тоо ширхэг"
              placeholderTextColor={"grey"}
              style={{ borderWidth: 1, padding: 5 }}
              value={quantity.toString()}
              onChangeText={setQuantity}
            />
          </>
        )}

        <TouchableOpacity
          style={{ backgroundColor: "#175E26", marginTop: 10 }}
          onPress={goBasket ? sendDataWithBasket : sendData}
        >
          <Text style={{ textAlign: "center", padding: 10, color: "#FF9B05" }}>
            Баталгаажуулах
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 200 }} />
      </ScrollView>
      {/*Bar code Modal */}
      <BarcodeModal
        setBarcode={setBarcode}
        barcode={barcode}
        handleBarCodeScanned={handleBarCodeScanned}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        scanned={scanned}
        setScanned={setScanned}
      />
      {/* Camera type modal */}
      <CameraModal
        openProductImageLibrary={openProductImageLibrary}
        productCamera={productCamera}
        cameraModal={cameraModal}
        setCameraModal={setCameraModal}
      />
      {/* CategoryModal */}
      <CategoryModal
        category={category}
        setCategoryModal={setCategoryModal}
        categoryModal={categoryModal}
        setCategoryId={setCategoryId}
        setCategoryName={setCategoryName}
      />
      {/* Quantity modal */}
      <QuantityModal
        quantityModal={quantityModal}
        setQuantityModal={setQuantityModal}
        setProductQuantity={setProductQuantity}
      />
    </KeyboardAvoidingView>
  );
};

export default AddProductModal;

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 5,
  },
});
