import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { api } from "../../../Constants";
import UserContext from "../../context/UserContex";

export default () => {
  const [time, setTime] = useState(null);
  const state = useContext(UserContext);
  const isFocused = useIsFocused();
  let isMounted = true;
  const UserProfileData = () => {
    axios
      .get(`${api}/api/v1/users/${state.userId}`)
      .then((result) => {
        if (isMounted) {
          setTime(result.data.time);
        }
      })
      .catch((err) => {
        let message = err.response.data.error.message;
        if (message === `${state.userId} ID-тэй хэрэглэгч байхгүй!`) {
          alert("Аккоунт устгагдсан эсвэл алдаа гарлаа дахин нэвтрэнэ үү");
          state.logout();
        } else if (
          message ===
          "Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна. Та эхлээд логин хийнэ үү. Authorization header-ээр эсвэ Cookie ашиглан токеноо дамжуулна уу."
        ) {
          alert("Алдаа гарлаа та дахин нэвтрэнэ үү");
          state.logout();
        }
      });
  };
  useEffect(() => {
    UserProfileData();
    return () => {
      isMounted = false;
    };
  }, [isFocused]);
  return [time];
};
