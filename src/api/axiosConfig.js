// axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL_BASEURL,
});

// Adiciona um interceptor para incluir o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funções utilitárias para acessar diferentes endpoints
export const apiUser = {
  register: (userData) => api.post("/user/register", userData),
  login: (userData) => api.post("/user/auth", userData),
  checkAccess: () => api.get("/user/check-access"),
  completeRegister: (addiotionalUserData) =>
    api.put("/user/complete-register", addiotionalUserData),
  profile: () => api.get("/user/profile"),
  advice: () => api.get("/user/advice"),
  getProfileDetails: (userName) => api.get(`/user/profile/${userName}`),
  updateProfile: (formData) => api.put("/user", formData)
};

export const getUserImageUrl = (fileName) => {
  return fileName ? `${api.defaults.baseURL}/images/users/${fileName}` : null;
};

export const getGroupImageUrl = (fileName) => {
  return fileName ? `${api.defaults.baseURL}/images/groups/${fileName}` : null;
};

export const apiGroups = {
  registerGroup: (formData) => api.post("/groups", formData),
  registerJoinGroup: (groupName) => api.post(`/groups/join/${groupName}`),
  listGroupsSearch: () => api.get("/groups/search"),
  listGroupsOwner: () => api.get("/groups/search/owner"),
  listGroupsMember: () => api.get("/groups/search/member"),
  listGroupsAuthorities: () => api.get("/groups/authorities"),
  listGroupsJoinRequestsByMe: () => api.get("/groups/search/joinRequests/user"),
  listGroupsJoinRequestsToOwner: () =>
    api.get("/groups/search/joinRequests/receive"),
  acceptJoinRequestByUserInGroup: (username, groupName) =>
    api.put(`/groups/join/${username}/${groupName}/accept`),
  rejectJoinRequestByUserInGroup: (username, groupName) =>
    api.put(`/groups/join/${username}/${groupName}/reject`),
  deleteJoinRequestToGroup: (groupName) =>
    api.put(`/groups/join/${groupName}/delete`),
  listDetailsForGroup: (groupName) => api.get(`/groups/profile/${groupName}`),
  listGroups: () => api.get("/groups/all"),
};

export const apiDonations = {
  createNewDonation: (groupName, donationData) =>
    api.post(`/donations/${groupName}`, donationData),
  createRequestToDonation: (donationId, groupName) => api.post(`/donations/${donationId}/${groupName}`),
  searchDonations: (groupName) =>
    api.get("/donations/search/donations", {
      params: {
        groupname: groupName,
      },
    }),
};

export default api;
