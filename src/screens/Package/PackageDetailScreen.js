import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import PackageModal from "../../components/Package/PackageModal";

const PackageDetailScreen = (props) => {
  const { id } = props.route.params;
  const [packageData, setPackageData] = useState([]);
  // isLoan
  const [loanModal, setLoanModal] = useState(false);
  const getPackageDetail = () => {
    axios
      .get(`${api}/api/v1/transactions/user?template=${id}`)
      .then((res) => {
        setPackageData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getPackageDetail();
  }, []);

  return (
    <SafeAreaView style={{ opacity: loanModal ? 0.2 : 1 }}>
      <ScrollView style={{ height: "100%" }}>
        {packageData.map((e) => {
          return (
            <View key={e._id}>
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                {e.good && (
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={{ uri: `${api}/upload/${e.good.photo}` }}
                      style={{ width: 50, height: 50, borderRadius: 10 }}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {e.good.name}
                      </Text>
                      <Text>Үнэ:{e.price}₮ </Text>
                      <Text>{e.quantity}ш </Text>
                      <Text>Нийт үнэ:{e.quantity * e.price}₮ </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
              <View style={{ borderWidth: 1, borderColor: "#cccccccc" }} />
            </View>
          );
        })}
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            backgroundColor: "#175E26",
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginTop: 10,
          }}
          onPress={() => setLoanModal(true)}
        >
          <Text style={styles.textStyle}>Болсон</Text>
        </TouchableOpacity>
      </ScrollView>
      <PackageModal setLoanModal={setLoanModal} loanModal={loanModal} id={id} />
    </SafeAreaView>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
