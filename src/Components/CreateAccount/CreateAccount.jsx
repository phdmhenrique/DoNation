import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { useAuth } from '../../Contexts/AuthContext.jsx';

import FullSize from "../../Components/FullSize/FullSize.jsx";
import Divisory from "../../Components/Divisory/Divisory.jsx";
import LeftSide from "../../Components/LeftSide/LeftSide.jsx";
import RightSide from "../../Components/RightSide/RightSide.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import LinkStyled from "../../Components/LinkStyled/LinkStyled";
import Login from "../../Components/RightSide/Login/Login.jsx";
import NoAccount from "../../Components/RightSide/Account/Account.jsx";
import Button from "../../Components/Button/Button.jsx";
import imageBanner from "../../Assets/donation-banner.png";
import SocialMedia from "../../Components/RightSide/SocialMedia/SocialMedia.jsx";
import CustomFields from "../../Components/CustomFields/CustomFields.jsx";

import { Terms, TermsHightlight } from "./CreateAccount.js";
import { CustomToastContainer } from "../Notification/Notification.js";

function CreateAccount() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName
        ? "Nome Completo é obrigatório"
        : /\d/.test(formData.fullName)
        ? "Nome Completo não pode conter números"
        : "",
      username: !formData.username
        ? "Nome de Usuário é obrigatório"
        : !validator.isAlphanumeric(formData.username.replace(/\s/g, ""))
        ? "Nome de Usuário não pode conter espaços, caracteres especiais ou acentos"
        : formData.username.length > 12
        ? "Nome de Usuário deve ter no máximo 12 caracteres"
        : "",
      email: !formData.email
        ? "Email é obrigatório"
        : !validator.isEmail(formData.email)
        ? "Email inválido"
        : "",
      password: !formData.password
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
      repeatPassword:
        !formData.repeatPassword && formData.password
          ? "Repetir a senha é obrigatório"
          : formData.password !== formData.repeatPassword
          ? "As senhas não estão iguais"
          : "",
    };

    setFormErrors(errors);
    setIsButtonEnabled(Object.values(errors).every((error) => !error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const errorField = Object.keys(formErrors).find((key) => formErrors[key]);
    if (errorField) {
      toast.error(formErrors[errorField]);
    } else {
      try {
        await signup({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        toast.success("A primeira etapa de cadastro foi um sucesso!")
        navigate("/")
      } catch (error) {
        toast.error(error.message)
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
      onChange: handleChange,
      error: formErrors.fullName,
    },
    {
      label: "Nome de Usuário",
      type: "text",
      placeholder: "Seunomedeusuario",
      name: "username",
      value: formData.username,
      onChange: handleChange,
      error: formErrors.username,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "seuemail@gmail.com",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: formErrors.email,
    },
    {
      label: "Senha (A senha deve conter de 8-16 caracteres)",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: formErrors.password,
      hasIcon: true,
    },
    {
      label: "Repetir a Senha",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "repeatPassword",
      value: formData.repeatPassword,
      onChange: handleChange,
      error: formErrors.repeatPassword,
      hasIcon: true,
    },
  ];

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["#Compartilhe", "#Inspire", "#Transforme"]}
          customClasses="leftside__more-titles"
          imgPath={imageBanner}
          alt="Donation Logo"
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

          <NoAccount className="no-account">
            Já tem uma conta?{" "}
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
