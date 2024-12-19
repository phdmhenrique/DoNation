import { useEffect, useState } from "react";

const useFormUserValidation = ({ initialState = {}, validators }) => {
  const defaultState = {
    username: "",
    email: "",
    bio: "",
    profileImage: null,
    landscapeImage: null,
    ...initialState, // Sobrescreve os valores padrão com os valores recebidos
  };

  const [formData, setFormData] = useState(defaultState);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const errors = {};
    Object.keys(validators).forEach((field) => {
      const error = validators[field](formData[field]);
      if (error) {
        errors[field] = error;
      }
    });
    setValidationErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, validationErrors, isFormValid, handleChange };
};

export default useFormUserValidation;
