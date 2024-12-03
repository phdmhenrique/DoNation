import { useState } from "react";

const useFormState = () => {
  const [toastId, setToastId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  return {
    toastId,
    setToastId,
    isSubmitting,
    setIsSubmitting,
    isButtonEnabled,
    setIsButtonEnabled,
  };
};

export default useFormState;
