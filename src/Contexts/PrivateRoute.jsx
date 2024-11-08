import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoadingScreen from '../Components/LoadingScreen/LoadingScreen.jsx';

const PrivateRoute = ({ children }) => {
  const { token, firstAccess, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    <LoadingScreen />
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Caso firstAccess seja verdadeiro, impeça acesso à rota de '/home'
  if (firstAccess && location.pathname.startsWith("/home")) {
    return <Navigate to="/create-account/stages" replace />;
  }

  // Caso firstAccess seja falso, impeça acesso à rota de '/create-account/stages'
  if (!firstAccess && location.pathname === "/create-account/stages") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
