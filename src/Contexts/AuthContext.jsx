import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser, completeRegistration } from "../api/auth";
import { apiUser } from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
  const [firstAccess, setFirstAccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/create-account") {
      localStorage.clear();
    }
  }, [location.pathname]);

  // Efeito para armazenar o usuário no localStorage sempre que o estado de user mudar
  useEffect(() => {
    if (user) {
      localStorage.getItem("user");
    }
  }, [user]); // Dependência no 'user' para atualizar sempre que ele mudar

  // Função para registrar um novo usuário
  const signup = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser(data.user); // Aqui o 'user' será atualizado corretamente
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
      await completeRegistration(registrationData, token);
      setFirstAccess(false);

      await checkAccess();
    } catch (error) {
      console.error("Erro ao completar o registro:", error);
      throw new Error("Erro ao completar o registro.");
    }
  };

  // Função para checar o valor de firstAccess (primeiro acesso)
  const checkAccess = async () => {
    try {
      const accessResponse = await apiUser.checkAccess();
      const isFirstAccess = accessResponse.data.firstAccess;
      setFirstAccess(isFirstAccess);

      if (isFirstAccess) {
        navigate("/create-account/stages");
      } else {
        const profileData = await apiUser.profile();
        setUser(profileData.data); // Aqui o 'user' será atualizado corretamente
        localStorage.setItem("user", JSON.stringify(profileData.data)); // Armazenar no localStorage
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao verificar acesso:", error.message);
      throw new Error("Erro ao verificar acesso.");
    }
  };

  // Função de login
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
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firstAccess,
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
