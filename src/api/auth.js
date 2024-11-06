import {apiUser} from './axiosConfig';

export const registerUser = async (userData) => {
  try {
    const dataToSend = {
      name: userData.fullName,
      username: userData.username,
      email: userData.email,
      password: userData.password,
      roles: ["USER"],
    };

    const response = await apiUser.register(dataToSend)

    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao registrar.")
  }
}

export const completeRegistration = async (additionalUserData) => {
  try {
    const dataToSend = {
      phone: additionalUserData.phone,
      birthday: additionalUserData.birthday, // .toISOString().split('T')[0]
      state: additionalUserData.state,
      city: additionalUserData.city,
      tags: additionalUserData.interests,
    };

    const response = await apiUser.completeRegister(dataToSend)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao completar registro.")
  }
}

export const loginUser = async (loginData) => {
  try {
    const response = await apiUser.login(loginData);
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login.")
  }
}