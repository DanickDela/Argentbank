import { useSelector } from "react-redux";

export function useAuthorized() {
  const token = useSelector((state) => state.auth.token);
  //conversion en booelan : si token existe, retourne true, sinon false
  return !!token;
}
