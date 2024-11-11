// Função para validar o número de telefone
export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/; // Formato esperado (XX)XXXXX-XXXX
  return phoneRegex.test(phoneNumber);
};

// Função para validação do formulário
export const validateForm = (formData, activeTab, selectedGroupsSecondStep) => {
  const errors = {
    // Validação do telefone
    phone: !formData.phone
      ? "Número de telefone é obrigatório."
      : !validatePhoneNumber(formData.phone)
      ? "Número de telefone inválido"
      : "",

    // Validação da data de nascimento
    birthday:
      activeTab === 1 && !formData.birthday
        ? "Data de nascimento é obrigatória."
        : "",

    // Validação de estado e cidade
    state:
      formData.state === "none" || !formData.state
        ? "Estado é obrigatório."
        : "",
    city:
      formData.city === "none" || !formData.city ? "Cidade é obrigatória." : "",

    // Validação de interesses
    interests:
      activeTab === 2 && selectedGroupsSecondStep.length === 0
        ? "Selecione ao menos um grupo de interesse!"
        : "",
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return { errors, isFormValid };
};
