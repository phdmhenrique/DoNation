// validateForm.ts
interface FormData {
  phone: string;
  birthday: string;
  state: string;
  city: string;
  interests: string[];
}

interface FormErrors {
  phone: string;
  birthday: string;
  state: string;
  city: string;
  interests: string;
}

// Função para validar o número de telefone
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/; // Formato esperado (XX)XXXXX-XXXX
  return phoneRegex.test(phoneNumber);
};

// Função para validação do formulário
export const validateForm = (
  formData: FormData,
  activeTab: number,
  selectedGroupsSecondStep: string[]
): { errors: FormErrors; isFormValid: boolean } => {
  const errors: FormErrors = {
    phone: !formData.phone
      ? "Número de telefone é obrigatório."
      : !validatePhoneNumber(formData.phone)
      ? "Número de telefone inválido"
      : "",

    birthday:
      activeTab === 1 && !formData.birthday
        ? "Data de nascimento é obrigatória."
        : "",

    state:
      formData.state === "none" || !formData.state
        ? "Estado é obrigatório."
        : "",

    city:
      formData.city === "none" || !formData.city ? "Cidade é obrigatória." : "",

    interests:
      activeTab === 2 && selectedGroupsSecondStep.length === 0
        ? "Selecione ao menos um grupo de interesse!"
        : "",
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return { errors, isFormValid };
};
