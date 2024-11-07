/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, completeRegistration } from "../api/auth";
import { apiUser } from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const navigate = useNavigate();

  // Função para registrar um novo usuário
  const signup = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error(
        "Erro ao cadastrar:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Erro ao registrar.");
    }
  };

  // Função para completar o registro com dados adicionais
  const completeRegistrationProcess = async (registrationData) => {
    try {
      const data = await completeRegistration(registrationData, token);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Erro ao completar o registro:", error);
      throw new Error("Erro ao completar o registro.");
    }
  };

  // Função para checar o valor de firstAccess (primeiro acesso) -> se for verdadeiro, redireciona para tela de completar cadastro, se não, redireciona para '/home'
  const checkAccess = async () => {
    try {
      const accessResponse = await apiUser.checkAccess();
      const firstAccess = accessResponse.data.firstAccess;

      localStorage.setItem("firstAccess", firstAccess);

      if (firstAccess) {
        navigate("/create-account/stages");
      } else {
        const profileData = await apiUser.profile();
        setUser(profileData.data);
        localStorage.setItem("user", JSON.stringify(profileData.data));
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao verificar acesso:", error.message);
      throw new Error("Erro ao verificar acesso.");
    }
  };

  // Função de login separada, que vai gerar o token
  const login = async (loginData) => {
    try {
      const loginResponse = await loginUser(loginData);

      setToken(loginResponse.accessToken);
      localStorage.setItem("accessToken", loginResponse.accessToken);

      await checkAccess();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Erro ao fazer login.");
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("firstAccess");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup,
        login,
        logout,
        completeRegistrationProcess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
