import validator from "validator";

// Validação do Nome Completo
export const validateFullName = (fullName) => {
  if (!fullName) return "Nome Completo é obrigatório!";
  if (/\d/.test(fullName)) return "Nome Completo não pode conter números!";
  if (fullName.length < 3 || fullName.length > 50)
    return "Seu nome deve ter de 3 a 50 caracteres!";
  return "";
};

// Validação do Nome de Usuário
export const validateUsername = (username) => {
  if (!username) return "Nome de Usuário é obrigatório!";
  if (!validator.isAlphanumeric(username.replace(/\s/g, "")))
    return "Nome de Usuário não pode conter espaços, caracteres especiais ou acentos!";
  if (username.length < 3 || username.length > 16)
    return "Nome de Usuário deve ter no mínimo 3 caracteres e no máximo 16 caracteres!";
  return "";
};

// Validação do Email
export const validateEmail = (email) => {
  if (!email) return "Email é obrigatório!";
  if (!validator.isEmail(email)) return "Email inválido!";
  if (/[A-Z]/.test(email)) return "O email não pode conter letras maiúsculas!";
  if (!/\.com$|\.org$/i.test(email.split("@")[1]))
    return "Domínio inválido. Deve terminar em .com ou .org!";
  return "";
};

// Validação da Senha
export const validatePassword = (password) => {
  if (!password) return "Senha é obrigatória!";
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return "Senha deve conter de 8-16 caracteres, letras maiúsculas, minúsculas, números e símbolos!";
  }
  return "";
};

// Validação da Repetição de Senha
export const validateRepeatPassword = (repeatPassword, password) => {
  if (!repeatPassword) return "Repetir a senha é obrigatório!";
  if (repeatPassword !== password) return "As senhas não estão iguais!";
  return "";
};

// Exportação consolidada
const validations = {
  validateFullName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateRepeatPassword,
};

export default validations;
