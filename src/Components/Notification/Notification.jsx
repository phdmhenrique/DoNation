import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification({ message, isError, onClose }) {
  if (isError) {
    toast.error(message);
  } else {
    toast.success(message);
  }

  return null; // Não renderiza nada diretamente, o toastNotification cuidará disso
}
