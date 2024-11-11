import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser, completeRegistration } from "../api/auth";
import { apiUser } from "../api/axiosConfig";

// Definindo tipos
interface User {
  // Defina as propriedades de `user` conforme o que o backend retorna.
  id: string;
  email: string;
  // Adicione mais propriedades conforme necessário.
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  firstAccess: boolean;
  isLoading: boolean;
  signup: (userData: { email: string, password: string }) => Promise<void>;
  login: (loginData: { email: string, password: string }) => Promise<void>;
  logout: () => void;
  completeRegistrationProcess: (registrationData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken") || null);
  const [firstAccess, setFirstAccess] = useState<boolean>(JSON.parse(localStorage.getItem("firstAccess") || "false"));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Se essas rotas forem acessadas, limpe o localStorage.
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/create-account") {
      localStorage.clear();
    }
  }, [location.pathname]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          await checkAccess();
        } catch (error) {
          console.error("Erro ao inicializar acesso:", error.message);
          logout();
        }
      }
    };
    initializeAuth();
  }, [token]);

  const signup = async (userData: { email: string, password: string }) => {
    try {
      const data = await registerUser(userData);
      setUser(data.user);
    } catch (error) {
      throw new Error(error.message || "Erro ao tentar registrar novo usuário!");
    }
  };

  const completeRegistrationProcess = async (registrationData: any) => {
    try {
      await completeRegistration(registrationData, token);
      setFirstAccess(localStorage.getItem("firstAccess"));
      await checkAccess();
    } catch (error) {
      throw new Error(error.message || "Erro ao completar o registro!");
    }
  };

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

  const login = async (loginData: { email: string, password: string }) => {
    try {
      const loginResponse = await loginUser(loginData);
      setToken(loginResponse.accessToken);
      localStorage.setItem("accessToken", loginResponse.accessToken);
      await checkAccess();
    } catch (error) {
      throw new Error(error.message || "Erro ao fazer login.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setFirstAccess(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{
      user, token, firstAccess, isLoading,
      signup, login, logout, completeRegistrationProcess
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
