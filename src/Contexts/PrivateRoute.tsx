import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Definindo as propriedades da rota privada
interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { user, token, firstAccess } = useAuth();
  const location = useLocation();

  if (!user || !token) {
    // Se o usuário não estiver autenticado, redireciona para o login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (firstAccess && path.startsWith("/home")) {
    // Se for o primeiro acesso, redireciona para o registro
    return <Navigate to="/create-account/stages" replace />;
  }

  if (!firstAccess && path === "/create-account/stages") {
    // Se o primeiro acesso não foi feito, redireciona para a página inicial
    return <Navigate to="/home" replace />;
  }

  // Se todas as condições forem satisfeitas, renderiza o componente da rota
  return <>{element}</>;
};

export default PrivateRoute;
