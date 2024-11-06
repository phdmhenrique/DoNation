// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
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
  completeRegister: (addiotionalUserData) => api.put("/user/complete-register", addiotionalUserData),
  login: (userData) => api.post("/user/auth", userData),
  profile: (config) => api.get("/user/profile", config),
};

export const apiGroups = {
  getAllGroups: () => api.get("/groups"),
  getGroupDetails: (groupId) => api.get(`/groups/${groupId}`),
  // Adicione outras rotas de grupo conforme necessário
};

export default api;
