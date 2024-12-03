import { useRef, useCallback } from "react";
import { toast } from "react-toastify";

const useToastMessage = () => {
  const toastIdRef = useRef(null); // Usamos useRef para persistir o toastId entre renderizações

  const showToastMessage = useCallback(
    (message, type = "info", isLoading = false, autoClose = 3000) => {
      if (toast.isActive(toastIdRef.current)) {
        toast.update(toastIdRef.current, {
          render: message,
          type,
          isLoading,
          autoClose,
        });
      } else {
        const newToastId = toast[type](message, { autoClose, isLoading });
        toastIdRef.current = newToastId;
      }
    },
    []
  );

  return showToastMessage;
};

export default useToastMessage;
