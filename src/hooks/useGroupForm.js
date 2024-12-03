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

  return { groupData, handleInputChange, handleImageChange };
};

export default useGroupForm;
