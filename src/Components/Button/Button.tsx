import React from "react";
import { ButtonStyled } from "./Button.ts";

// Definição de tipos para as props do botão
interface ButtonProps {
  children: React.ReactNode; // Pode ser texto ou outros elementos
  addStatusClass?: string; // Classe CSS adicional
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Função para o clique
  isDisabled?: boolean; // Flag para desabilitar o botão
}

const Button: React.FC<ButtonProps> = ({ children, addStatusClass, onClick, isDisabled = false }) => {
  const buttonClass = `button ${addStatusClass} ${isDisabled ? "disabled" : ""}`;

  return (
    <ButtonStyled
      className={buttonClass}
      onClick={!isDisabled ? onClick : undefined} // Previne o clique se o botão estiver desabilitado
      disabled={isDisabled}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
