import { useState } from "react";

const useFormState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  return {
    isSubmitting,
    setIsSubmitting,
    isButtonEnabled,
    setIsButtonEnabled,
  };
};

export default useFormState;
