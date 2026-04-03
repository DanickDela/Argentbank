import { Navigate } from "react-router-dom";
import { useAuthorized } from "../../hooks/useAuthorized";

function RequiredAuth({ children }) {
  const isAuthorized = useAuthorized();

  return isAuthorized ? children : <Navigate to="/login" replace />;
}

export default RequiredAuth;
