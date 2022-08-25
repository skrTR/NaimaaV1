import { Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../Constants";
import { useNavigation } from "@react-navigation/native";

const SearchByPhoto = () => {
  const [photo, setPhoto] = useState([]);
  const navigation = useNavigation();
  const getPhoto = () => {
    axios
      .get(
        `${api}/api/v1/goods/user?limit=100&select=quantity price photo name`
      )
      .then((res) => {
        setPhoto(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <>
      <FlatList
        data={photo}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PhotoByBasket", { data: item })
              }
            >
              <Image
                source={{ uri: `${api}/upload/${item.photo}` }}
                style={{
                  width: 120,
                  height: 120,
                  margin: 5,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default SearchByPhoto;
