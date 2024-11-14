import React from "react";
import {
  RightsideLogin,
  RightsideLogin__Title,
  RightSideButtons,
  TabHeader,
  TabHeaderItem,
} from "./Login.ts";

interface LoginProps {
  pageTitle: React.ReactNode | string;
  formButtons: React.ReactNode[];  // Botões do formulário
  rightsideInputs: React.ReactNode[];  // Inputs à direita
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;  // Função para enviar o formulário
  showTabs?: boolean;  // Controle de tabs visíveis
  activeTab?: number;  // Tab ativa
}

function Login({ pageTitle, formButtons, rightsideInputs, onSubmit, showTabs, activeTab }: LoginProps) {
  // Tipando o evento corretamente
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);  // Passa o evento para a função onSubmit se existir
    }
  };

  return (
    <RightsideLogin className="rightside-login" onSubmit={handleSubmit}>
      <RightsideLogin__Title className="rightside-login__title">
        {pageTitle}
      </RightsideLogin__Title>

      {showTabs && (
        <TabHeader>
          <TabHeaderItem className={activeTab === 1 ? "active" : ""} />
          <TabHeaderItem className={activeTab === 2 ? "active" : ""} />
        </TabHeader>
      )}

      {Array.isArray(rightsideInputs)
        ? rightsideInputs.map((input, index) => <div key={index}>{input}</div>)
        : rightsideInputs}

      <RightSideButtons className="rightside-buttons">
        {formButtons.map((button, index) => (
          <div key={index}>{button}</div>
        ))}
      </RightSideButtons>
    </RightsideLogin>
  );
}

export default Login;
