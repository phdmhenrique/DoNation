// src/utils/validation.js
import { subYears, isAfter, isValid } from "date-fns";

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

export const validateDate = (date) => {
  const currentDate = new Date();
  const minDateFor18YearsOld = subYears(currentDate, 18);
  return date <= minDateFor18YearsOld ? "You must be over 18 years old." : "";
};

export const validateState = (state) => {
  return state === "none" || !state ? "State is required" : "";
};

export const validateCity = (city) => {
  return city === "none" || !city ? "City is required" : "";
};

export const validateForm = (formData, activeTab, selectedGroupsSecondStep) => {
  const currentDate = new Date();
  const minDateFor18YearsOld = subYears(currentDate, 18); // Data mínima para ter 18 anos

  const errors = {
    cellphone: !formData.cellphone
      ? "Phone number is required."
      : !validatePhoneNumber(formData.cellphone)
      ? "Invalid phone number."
      : "",
    date: isAfter(formData.date, minDateFor18YearsOld)
      ? "Invalid date of birth."
      : "",
    state: validateState(formData.state),
    city: validateCity(formData.city),
    interests:
      activeTab === 2 && selectedGroupsSecondStep.length === 0
        ? "Select at least one interest group!"
        : "",
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return { errors, isFormValid };
};
