import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
import { useAuth } from "./Contexts/AuthContext.jsx";

import "react-toastify/dist/ReactToastify.css";

import { RightSideButtons__Span } from "./App.js";

import FullSize from "./Components/FullSize/FullSize.jsx";
import Divisory from "./Components/Divisory/Divisory.jsx";
import LeftSide from "./Components/LeftSide/LeftSide.jsx";
import RightSide from "./Components/RightSide/RightSide.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import LinkStyled from "./Components/LinkStyled/LinkStyled";
import Login from "./Components/RightSide/Login/Login.jsx";
import NoAccount from "./Components/RightSide/Account/Account.jsx";
import SocialMedia from "./Components/RightSide/SocialMedia/SocialMedia.jsx";
import OtherAccess from "./Components/RightSide/OtherAccess/OtherAccess.jsx";
import Button from "./Components/Button/Button.jsx";
import CustomFields from "./Components/CustomFields/CustomFields.jsx";
import imageBanner from "./Assets/donation-banner.png";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import { CustomToastContainer } from "./Components/Notification/Notification.js";

function App() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
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
      email: !formData.email
        ? "Email é obrigatório"
        : !validator.isEmail(formData.email)
        ? "Email inválido"
        : "",
      password: !formData.password
        ? "Senha é obrigatório"
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
        await login({
          email: formData.email,
          password: formData.password,
        });

        setIsLoading(false);
        toast.success("Login realizado com sucesso");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const fieldsConfigs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: formErrors.emailError,
    },
    {
      label: "Senha",
      type: formData.showPassword ? "text" : "password",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: formErrors.senhaError,
      hasIcon: true,
    },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["do"]}
          bold={0}
          imgPath={imageBanner}
          alt="Donation Logo"
        />
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
              >
                Entrar
              </Button>,
              <RightSideButtons__Span key="2">
                Esqueceu sua senha?
              </RightSideButtons__Span>,
            ]}
          />

          <NoAccount className="no-account">
            Não tem uma conta?{" "}
            <LinkStyled to="/create-account" className="link">
              Criar Conta
            </LinkStyled>
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

export default App;
