// axiosConfig.js
import axios from 'axios';

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
  completeRegister: (addiotionalUserData) => api.put("/user/complete-register", addiotionalUserData),
  profile: () => api.get("/user/profile"),
};

export const getUserImageUrl = (fileName) => {
  return fileName ? `${api.defaults.baseURL}images/users/${fileName}` : null;
};

export const apiGroups = {
  getAllGroups: () => api.get("/groups"),
  getGroupDetails: (groupId) => api.get(`/groups/${groupId}`),
  // Adicione outras rotas de grupo conforme necessário
};

export default api;
