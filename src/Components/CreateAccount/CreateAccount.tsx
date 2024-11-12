import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { useAuth } from "../../Contexts/AuthContext.tsx";
import { Terms, TermsHightlight } from "./CreateAccount.js";

import {
  FullSize,
  Divisory,
  LeftSide,
  RightSide,
  Footer,
  LinkStyled,
} from "../../AppComponents.ts";
import Login from "../RightSide/Login/Login.tsx";
import NoAccount from "../RightSide/Account/Account.tsx";
import Button from "../Button/Button.tsx";
import SocialMedia from "../RightSide/SocialMedia/SocialMedia.tsx";
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import CustomFields from "../CustomFields/CustomFields.tsx";
import {
  CustomToastContainer,
  showToast,
} from "../Notification/Notification.tsx";

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  showPassword: boolean;
}

interface FormErrors {
  fullNameError: string;
  usernameError: string;
  emailError: string;
  passwordError: string;
  repeatPasswordError: string;
}

function CreateAccount() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [toastId, setToastId] = useState<string | number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    fullNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  });

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const errors: FormErrors = {
      fullNameError: !formData.fullName
        ? "Nome Completo é obrigatório"
        : /\d/.test(formData.fullName)
        ? "Nome Completo não pode conter números"
        : formData.fullName.length > 50 || formData.fullName.length < 3
        ? "Seu nome deve ter de 3 a 50 caracteres."
        : "",
      usernameError: !formData.username
        ? "Nome de Usuário é obrigatório"
        : !validator.isAlphanumeric(formData.username.replace(/\s/g, ""))
        ? "Nome de Usuário não pode conter espaços, caracteres especiais ou acentos"
        : formData.username.length > 16 || formData.username.length < 3
        ? "Nome de Usuário deve ter no mínimo 3 caracteres e no máximo 16 caracteres"
        : "",
      emailError: !formData.email
        ? "Email é obrigatório"
        : !validator.isEmail(formData.email)
        ? "Email inválido"
        : /[A-Z]/.test(formData.email)
        ? "O email não pode conter letras maiúsculas."
        : !/\.com$|\.org$/i.test(formData.email.split("@")[1])
        ? "Domínio inválido. Deve terminar em .com ou .org"
        : "",
      passwordError: !formData.password
        ? "Senha é obrigatória"
        : !validator.isStrongPassword(String(formData.password), {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          })
        ? "Senha deve conter de 8-16 caracteres, letras maiúsculas, minúsculas, números e símbolos"
        : "",
      repeatPasswordError:
        !formData.repeatPassword && formData.password
          ? "Repetir a senha é obrigatório"
          : formData.password !== formData.repeatPassword
          ? "As senhas não estão iguais"
          : "",
    };

    setFormErrors(errors);
    setIsButtonEnabled(!Object.values(errors).some(Boolean));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();

    const errorField = Object.keys(formErrors).find(
      (key) => formErrors[key as keyof FormErrors]
    ) as keyof FormErrors;

    if (errorField) {
      if (!toast.isActive(toastId!)) {
        const newToastId = toast.error(
          formErrors[errorField as keyof FormErrors],
          {
            autoClose: 3000,
            onClose: () => setToastId(null),
          }
        );
        setToastId(newToastId);
      }
      return;
    }

    if (!isSubmitting) {
      setIsSubmitting(true);

      const loadingToastId = showToast("Processando Cadastro...", "loading") || "default-toast-id";
      setToastId(loadingToastId);

      try {
        await signup({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        toast.update(loadingToastId, {
          render: "A primeira etapa de cadastro foi um sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/");
        }, 3000);
      } catch (error: any) {
        toast.update(loadingToastId, {
          render:
            error.message ||
            "Ocorreu um erro no cadastro. Verifique os campos.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const fieldsConfigs = [
    {
      label: "Nome Completo",
      type: "text",
      placeholder: "Seu Nome Completo",
      name: "fullName",
      value: formData.fullName,
      onChange: (name: string, value: string) => handleChange(name as keyof FormData, value),
      error: formErrors.fullNameError,
    },
    {
      label: "Nome de Usuário",
      type: "text",
      placeholder: "Seunomedeusuario",
      name: "username",
      value: formData.username,
      onChange: (name: string, value: string) => handleChange(name as keyof FormData, value),
      error: formErrors.usernameError,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "seuemail@gmail.com",
      name: "email",
      value: formData.email,
      onChange: (name: string, value: string) => handleChange(name as keyof FormData, value),
      error: formErrors.emailError,
    },
    {
      label: "Senha (A senha deve conter de 8-16 caracteres)",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "password",
      value: formData.password,
      onChange: (name: string, value: string) => handleChange(name as keyof FormData, value),
      error: formErrors.passwordError,
      hasIcon: true,
    },
    {
      label: "Repetir a Senha",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "repeatPassword",
      value: formData.repeatPassword,
      onChange: (name: string, value: string) => handleChange(name as keyof FormData, value),
      error: formErrors.repeatPasswordError,
      hasIcon: true,
    },
  ];

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["#Compartilhe", "#Inspire", "#Transforme"]}
          customClasses="leftside__more-titles"
        />
        <RightSide>
          <Login
            pageTitle="Cadastrar"
            rightsideInputs={fieldsConfigs.map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Link to="/" key="no-key">
                <Button key={1} addStatusClass="inactive">
                  Cancelar
                </Button>
              </Link>,
              <Button
                key={2}
                addStatusClass={isButtonEnabled ? "active" : "disabled"}
                onClick={handleSubmit}
                isDisabled={isLoading || isSubmitting}
              >
                Cadastrar
              </Button>,
              <Terms key={3}>
                Ao se inscrever você concorda com nossos{" "}
                <TermsHightlight>Termos de Serviço</TermsHightlight> e{" "}
                <TermsHightlight>Política de Privacidade</TermsHightlight> e
                confirma que tem pelo menos 18 anos de idade.
              </Terms>,
            ]}
          />

          <NoAccount text="Já tem uma conta? " className="no-account">
            <LinkStyled to="/" className="link">
              Entrar agora
            </LinkStyled>
          </NoAccount>

          <SocialMedia
            message={
              <React.Fragment>
                Total de 285 comunidades criadas.
                <br />
                Unindo Ações para um Mundo Melhor.
              </React.Fragment>
            }
          />

          <CustomToastContainer
            toastStyle={{
              fontSize: "1.4rem",
            }}
          />
        </RightSide>
      </Divisory>
      <Footer />
    </FullSize>
  );
}

export default CreateAccount;
