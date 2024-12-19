import { createContext, useContext, useState } from "react";
import { apiUser } from "../api/axiosConfig";  // Importando do axiosConfig
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const { token } = useAuth();

  // Carrega os dados do perfil do usuário
  const fetchProfile = async (userName) => {
    try {
      const response = await apiUser.getProfileDetails(userName);  // Usando apiUser para pegar os dados
      setProfile(response.data);
    } catch (error) {
      throw new Error(error.message || "Erro ao carregar os dados do perfil!");
    }
  };

  // Atualiza os dados do perfil
  const updateUserProfile = async (formData) => {
    try {
      const response = await apiUser.updateProfile(formData);  // Usando apiUser para atualizar
      setProfile(response.data);
    } catch (error) {
      throw new Error(error.message || "Erro ao atualizar o perfil!");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        fetchProfile,
        updateUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
