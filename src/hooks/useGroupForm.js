import { useState } from "react";

const useGroupForm = (initialState = {}) => {
  const [groupData, setGroupData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setGroupData((prev) => ({ ...prev, [name]: { file, previewUrl } }));
    }
  };

  const validateFields = () => {
    const errors = {};
    if (!groupData.comunityTitle)
      errors.comunityTitle = "O nome é obrigatório.";
    if (!groupData.comunityAddress)
      errors.comunityAddress = "O endereço é obrigatório.";
    if (!groupData.comunityDescription)
      errors.comunityDescription = "A descrição é obrigatória.";
    return errors;
  };

  return { groupData, handleInputChange, handleImageChange, validateFields };
};

export default useGroupForm;
