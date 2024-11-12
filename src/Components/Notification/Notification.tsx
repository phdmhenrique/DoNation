import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

// Definição de tipos para a customização do ToastContainer
export const CustomToastContainer = styled(ToastContainer)`
  right: 5rem;
`;

const defaultToastConfig: ToastOptions = {
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
export function showToast(message: string, type: "success" | "error" | "info" | "loading" | "default" = "default") {
  switch (type) {
    case "success":
      toast.success(message, defaultToastConfig);
      break;
    case "error":
      toast.error(message, defaultToastConfig);
      break;
    case "info":
      toast.info(message, defaultToastConfig);
      break;
    case "loading":
      const id = toast.loading("Processando...", defaultToastConfig);
      return id; // Retorna o ID para que você possa atualizar o estado de promessa mais tarde
    default:
      toast(message, defaultToastConfig);
  }
}

// Função para atualizar promessas com o toast.promise
export function handlePromise<T>(promise: Promise<T>, successMessage: string, errorMessage: string) {
  toast.promise(
    promise,
    {
      pending: "Processando...",
      success: successMessage,
      error: errorMessage,
    },
    defaultToastConfig
  );
}
