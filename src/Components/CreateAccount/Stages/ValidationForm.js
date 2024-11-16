// Function to validate the phone number
export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/; // Expected format (XX)XXXXX-XXXX
  return phoneRegex.test(phoneNumber);
};

// Function to validate the form
export const validateForm = (formData, activeTab, selectedGroupsSecondStep) => {
  const errors = {
    // Phone validation
    phone: !formData.phone
      ? "Phone number is required."
      : !validatePhoneNumber(formData.phone)
      ? "Invalid phone number."
      : "",

    // Birthday validation
    birthday:
      activeTab === 1 && !formData.birthday
        ? "Date of birth is required."
        : "",

    // State and city validation
    state:
      formData.state === "none" || !formData.state
        ? "State is required."
        : "",
    city:
      formData.city === "none" || !formData.city
        ? "City is required."
        : "",

    // Interests validation
    interests:
      activeTab === 2 && selectedGroupsSecondStep.length === 0
        ? "Select at least one interest group!"
        : "",
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return { errors, isFormValid };
};
