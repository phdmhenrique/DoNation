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
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Error registering user.";
    throw new Error(errorMessage)
  }
}

export const completeRegistration = async (additionalUserData, token) => {
  try {
    const dataToSend = {
      phone: additionalUserData.phone,
      birthday: additionalUserData.birthday,
      state: additionalUserData.state,
      city: additionalUserData.city,
      tags: additionalUserData.interests,
    };

    const response = await apiUser.completeRegister(dataToSend, token)
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Error completing registration.";
    throw new Error(errorMessage);
  }
}

export const loginUser = async (loginData) => {
  try {
    const response = await apiUser.login(loginData);
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "Error logging in.";
    throw new Error(errorMessage);
  }
}