import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser, completeRegistration } from "../api/auth";
import { apiUser } from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [firstAccess, setFirstAccess] = useState(
    JSON.parse(localStorage.getItem("firstAccess")) || false
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Se essas rotas forem acessadas, limpe o localStorage.
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/create-account") {
      localStorage.clear();
    }
  }, [location.pathname]);

  // Atualiza o estado de `firstAccess` com o valor do servidor caso seja alterado manualmente no localStorage.
  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     if (token) {
  //       try {
  //         await checkAccess();
  //       } catch (error) {
  //         console.error("Erro ao inicializar acesso:", error.message);
  //         logout();
  //       }
  //     }
  //   };
  //   initializeAuth();
  // }, [token]);

  // Efeito para armazenar o usuário no localStorage sempre que o estado de user mudar
  useEffect(() => {
    if (user) {
      localStorage.getItem("user");
    }
  }, [user]);

  // Função para registrar um novo usuário
  const signup = async (userData) => {
    try {
      const data = await registerUser(userData);
      setUser(data.user);
    } catch (error) {
      throw new Error(
        error.message || "Erro ao tentar registrar novo usuário!"
      );
    }
  };

  // Função para completar o registro com dados adicionais
  const completeRegistrationProcess = async (registrationData) => {
    try {
      await completeRegistration(registrationData, token);
      setFirstAccess(localStorage.getItem("firstAccess"));

      await checkAccess();
    } catch (error) {
      throw new Error(error.message || "Erro ao completar o registro!");
    }
  };

  // Função para checar o valor de firstAccess (primeiro acesso)
  const checkAccess = async () => {
    try {
      const accessResponse = await apiUser.checkAccess();
      const isFirstAccess = accessResponse.data.firstAccess;
      setFirstAccess(isFirstAccess);
      localStorage.setItem("firstAccess", JSON.stringify(isFirstAccess));

      if (isFirstAccess) {
        navigate("/create-account/stages");
      } else {
        const profileData = await apiUser.profile();
        setUser(profileData.data);
        localStorage.setItem("user", JSON.stringify(profileData.data));
        navigate("/home");
      }
    } catch (error) {
      throw new Error(error.message || "Erro ao verificar acesso!");
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
      throw new Error(error.message || "Erro ao fazer login.");
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setFirstAccess(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        firstAccess,
        isLoading,
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
