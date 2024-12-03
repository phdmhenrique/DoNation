import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export const CustomToastContainer = styled(ToastContainer)`
  right: 5rem;
`;

// Configurações padrão para todos os toasts
const defaultToastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  pauseOnFocusLoss: false,
  theme: "light",
};

// Função para exibir mensagens customizadas
export function showToast(message, type = "default", customConfig = {}) {
  const toastConfig = { ...defaultToastConfig, ...customConfig }; // Mescla as configurações padrão com as customizadas
  
  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "info":
      toast.info(message, toastConfig);
      break;
    case "loading":
      const id = toast.loading(message || "Processando...", toastConfig);
      return id; // Retorna o ID para que você possa atualizar o estado da promessa
    default:
      toast(message, toastConfig);
  }
}

// Função para lidar com promessas com toasts dinâmicos
export function handlePromise(promise, successMessage, errorMessage, customConfig = {}) {
  const toastConfig = { ...defaultToastConfig, ...customConfig }; // Permite configurações personalizadas

  toast.promise(
    promise,
    {
      pending: "Processando...",
      success: successMessage,
      error: errorMessage,
    },
    toastConfig
  );
}
