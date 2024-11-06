// src/utils/validation.js
import { subYears, isAfter, isValid } from "date-fns";

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phoneNumber);
};

export const validateDate = (birthday) => {
  const currentDate = new Date();
  const minDateFor18YearsOld = subYears(currentDate, 18);

  const parsedDate = typeof birthday === "string" ? new Date(birthday) : birthday;

  if (isNaN(parsedDate)) {
    return "Data inválida.";
  }

  return isAfter(parsedDate, minDateFor18YearsOld) ? "Você precisa ter mais de 18 anos." : "";
};

export const validateState = (state) => {
  return state === "none" || !state ? "Estado é obrigatório." : "";
};

export const validateCity = (city) => {
  return city === "none" || !city ? "Cidade é obrigatória." : "";
};

export const validateForm = (formData, activeTab, selectedGroupsSecondStep) => {
  const currentDate = new Date();
  const minDateFor18YearsOld = subYears(currentDate, 18); // Data mínima para ter 18 anos

  // Log para verificar o valor da data
  console.log("Data fornecida no formulário:", formData.birthday);

  // Tenta criar um objeto Date a partir da data fornecida
  const parsedDate = new Date(formData.birthday);

  // Log para verificar a data convertida
  console.log("Data convertida:", parsedDate);

  const errors = {
    phone: !formData.phone ? "Número de telefone é obrigatório." : !validatePhoneNumber(formData.phone) ? "Número de telefone inválido" : "",
    birthday: isAfter(parsedDate, minDateFor18YearsOld) ? "Data de nascimento inválida." : "", // Alterado para usar parsedDate
    state: validateState(formData.state),
    city: validateCity(formData.city),
    interests: activeTab === 2 && selectedGroupsSecondStep.length === 0 ? "Selecione ao menos um grupo de interesse!" : "",
  };

  // Log para verificar os erros
  console.log("Erros encontrados:", errors);

  const isFormValid = Object.values(errors).every((error) => !error);

  return { errors, isFormValid };
};

