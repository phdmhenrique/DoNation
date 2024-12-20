import { toast } from "react-toastify";

const useToastManager = () => {
  const toastCache = {};

  const showToast = (id, message, options = {}) => {
    if (toastCache[id]) {
      toast.update(toastCache[id], {
        render: message,
        ...options,
      });
    } else {
      const toastId = toast(message, options);
      toastCache[id] = toastId;
    }
  };

  const dismissToast = (id) => {
    if (toastCache[id]) {
      toast.dismiss(toastCache[id]);
      delete toastCache[id];
    }
  };

  return { showToast, dismissToast };
};

export default useToastManager;
