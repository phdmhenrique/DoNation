import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export const CustomToastContainer = styled(ToastContainer)`
  right: 5rem;
`;

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

// Function to display custom messages
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
      // Toast for loading state, using toast.promise
      const id = toast.loading("Processing...", defaultToastConfig);
      return id; // Return the ID so you can update the promise state later
    default:
      toast(message, defaultToastConfig);
  }
}

// Function to update promises with toast.promise
export function handlePromise(promise, successMessage, errorMessage) {
  toast.promise(
    promise,
    {
      pending: "Processing...",
      success: successMessage,
      error: errorMessage,
    },
    defaultToastConfig
  );
}
