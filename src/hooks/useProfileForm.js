import { useState } from "react";

const useProfileForm = (initialState = {}) => {
  const [profileData, setProfileData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files && files[0]) {
  //     const file = files[0];
  //     const previewUrl = URL.createObjectURL(file);
  //     setProfileData((prev) => ({ ...prev, [name]: { file, previewUrl } }));
  //   }
  // };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file); // Cria URL para pré-visualização
      setProfileData((prevState) => ({
        ...prevState,
        [name]: { file, previewUrl },
      }));
    }
  };

  // const validateFields = () => {
  //   const errors = {};
  //   if (!profileData.comunityTitle)
  //     errors.comunityTitle = "O nome é obrigatório.";
  //   if (!profileData.comunityAddress)
  //     errors.comunityAddress = "O endereço é obrigatório.";
  //   if (!profileData.comunityDescription)
  //     errors.comunityDescription = "A descrição é obrigatória.";
  //   return errors;
  // };

  return { profileData, handleInputChange, handleImageChange }; // validateFields
};

export default useProfileForm;
