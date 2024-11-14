import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { useAuth } from "./Contexts/AuthContext";
import { FormData, FormErrors } from "./types/FormTypes.ts";

import {
  RightSideButtons__Span,
  FullSize,
  Divisory,
  LeftSide,
  RightSide,
  Footer,
  LinkStyled,
} from "./AppComponents";

import {
  CustomToastContainer,
  showToast,
} from "./Components/Notification/Notification.tsx";
import CustomFields from "./Components/CustomFields/CustomFields.tsx";
import Login from "./Components/RightSide/Login/Login.tsx";
import Button from "./Components/Button/Button.tsx";
import NoAccount from "./Components/RightSide/Account/Account.tsx";
import SocialMedia from "./Components/RightSide/SocialMedia/SocialMedia.tsx";
import OtherAccess from "./Components/RightSide/OtherAccess/OtherAccess.tsx";

function App() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastId, setToastId] = useState<string | number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    emailError: "",
    passwordError: "",
  });

  // Função para atualizar os dados do formulário
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validação de formulário
  const validateForm = () => {
    const errors: FormErrors = {
      emailError: formData.email
        ? validator.isEmail(formData.email)
          ? ""
          : "Email inválido"
        : "Email é obrigatório",
      passwordError: formData.password
        ? validator.isStrongPassword(formData.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
          ? ""
          : "Senha deve conter de 8-16 caracteres, letras maiúsculas, minúsculas, números e símbolos"
        : "Senha é obrigatória",
    };

    setFormErrors(errors);
    setIsButtonEnabled(!Object.values(errors).some(Boolean));
  };

  // Validação de formulário em cada mudança
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Função para submissão do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    validateForm();

    // Verifica se há algum erro no formulário
    const errorField = Object.keys(formErrors).find((key) => formErrors[key as keyof FormErrors]) as keyof FormErrors;

    // Se houver erro, exibe a notificação de erro e impede o envio
    if (errorField) {
      if (!toast.isActive(toastId!)) {
        const newToastId = toast.error(formErrors[errorField as keyof FormErrors], {
          autoClose: 3000,
          onClose: () => setToastId(null),
        });
        setToastId(newToastId);
      }
      return;
    }

    // Se não houver erro, continua com o login
    if (!isSubmitting) {
      setIsSubmitting(true);

      // Exibe o toast de "processando"
      const loadingToastId =
        showToast("Processando Login...", "loading") || "default-toast-id";
      setToastId(loadingToastId);

      try {
        // Faz o login com a API
        await login({
          email: formData.email,
          password: formData.password,
        });

        // Atualiza o toast para sucesso
        toast.update(loadingToastId, {
          render: "Login realizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error: any) {
        // Atualiza o toast para erro
        toast.update(loadingToastId, {
          render: error.message || "Ocorreu um erro no login.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Configuração dos campos de entrada com tipagem
  const fieldsConfigs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: (name: string, value: string) =>
        handleChange(name as keyof FormData, value),
      error: formErrors.emailError,
    },
    {
      label: "Senha",
      type: formData.showPassword ? "text" : "password",
      name: "password",
      value: formData.password,
      onChange: (name: string, value: string) =>
        handleChange(name as keyof FormData, value),
      error: formErrors.passwordError,
      hasIcon: true,
    },
  ];

  return (
    <FullSize>
      <Divisory>
        <LeftSide DonationTitles={["do"]} bold={0} />
        <RightSide>
          <Login
            pageTitle="Entrar"
            rightsideInputs={fieldsConfigs.map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Button
                key="1"
                addStatusClass={isButtonEnabled ? "active" : "disabled"}
                onClick={handleSubmit}
                isDisabled={isSubmitting}
              >
                Entrar
              </Button>,
              <RightSideButtons__Span key="2">
                Esqueceu sua senha?
              </RightSideButtons__Span>,
            ]}
          />
          <NoAccount text="Não tem uma conta? ">
            <LinkStyled to="/create-account">Criar Conta</LinkStyled>
          </NoAccount>
          <SocialMedia
            message={
              <React.Fragment>
                Compartilhe, Inspire, Transforme.
                <br />
                Unindo Ações para um Mundo Melhor.
              </React.Fragment>
            }
            optionalComponent={<OtherAccess />}
          />
          <CustomToastContainer toastStyle={{ fontSize: "1.4rem" }} />
        </RightSide>
      </Divisory>
      <Footer />
    </FullSize>
  );
}

export default App;
