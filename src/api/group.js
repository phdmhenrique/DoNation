import { apiGroups } from "./axiosConfig";

export const registerGroups = async (formData) => {
  try {
    const response = await apiGroups.registerGroup(formData);

    // const dataToSend = {
    //   name: groupData.name,
    //   description: groupData.description,
    //   address: groupData.address,
    //   groupImage: groupData.groupImage,
    //   landscapeImage: groupData.landscapeImage,
    // };
    
    // const response = await apiGroups.registerGroup(dataToSend);

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Erro ao registrar o novo grupo!"
    throw new Error(errorMessage);
  }
};
