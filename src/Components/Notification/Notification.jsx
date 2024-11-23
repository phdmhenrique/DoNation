import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
export function showToast(message, type = "default") {
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
      return id;
    default:
      toast(message, defaultToastConfig);
  }
}

// Função para atualizar promessas com o toast.promise
export function handlePromise(promise, successMessage, errorMessage) {
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

export const CustomToastContainer = () => (
  <ToastContainer className="absolute top-0 right-16 z-50" />
);
