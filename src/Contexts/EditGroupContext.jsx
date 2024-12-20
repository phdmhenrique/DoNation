import { createContext, useContext } from 'react';
import { apiGroups } from '../api/axiosConfig';

const EditGroupContext = createContext();

export function EditGroupProvider({ children }) {
  const updateGroupProfile = async (groupName, formData) => {
    try {
      const response = await apiGroups.updateGroup(groupName, formData);
      return response.data;
    } catch (error) {
      console.error(error)
    }
  };

  const deleteGroup = async (groupName) => {
    try {
      const response = await apiGroups.deleteGroup(groupName);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <EditGroupContext.Provider value={{ updateGroupProfile, deleteGroup }}>
      {children}
    </EditGroupContext.Provider>
  );
}

export const useEditGroup = () => {
  const context = useContext(EditGroupContext);
  if (!context) {
    throw new Error('useEditGroup must be used within an EditGroupProvider');
  }
  return context;
};

