import validator from "validator";

export const validateEmail = (email) => {
  if (!email) return "Email é obrigatório!";
  if (!validator.isEmail(email)) return "Email inválido!"
  return ""
}

export const validatePassword = (password) => {
  if (!password) return "Senha é obrigatório!"
  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })) {
    return "Senha deve conter de 8-16 caracteres, letras maiúsculas, minúsculas, números e símbolos!"
  }

  return "";
}