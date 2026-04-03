import { loginUser } from "../service/api";
import { useDispatch } from "react-redux";
import { setToken } from "../store/authSlice";

export const useLoginUser = () => {
  const dispatch = useDispatch();

  return async (email, password, remember) => {
    const token = await loginUser(email, password);
    dispatch(setToken(token));

    if (remember) {
      localStorage.setItem("token", token);
      sessionStorage.removeItem("token");
    } else {
      sessionStorage.setItem("token", token);
      localStorage.removeItem("token");
    }

    return token;
  };
};
