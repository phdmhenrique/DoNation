import { createContext, useContext, useState } from "react";
import { registerGroups } from "../api/group";
import { useAuth } from './AuthContext'

const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [group, setGroup] = useState(null);
  const { token } = useAuth();

  const registerNewGroup = async (formData) => {
    try {
      const data = await registerGroups(formData, token);
      setGroup(data.group);
    } catch (error) {
      throw new Error(
        error.message || "Erro ao tentar cadastrar novo grupo!"
      )
    }
  };

  return (
    <GroupContext.Provider
      value={{
        registerNewGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => useContext(GroupContext);
