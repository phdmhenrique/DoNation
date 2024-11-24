import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./Contexts/AuthContext.jsx";
import { validateEmail, validatePassword } from "./utils/validation.js";
import useForm from "./hooks/useForm.js";

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
import {
  CustomToastContainer,
  showToast,
} from "./Components/Notification/Notification.jsx";

const App = () => {
  const { login } = useAuth();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastId, setToastId] = useState(null);

  const [formData, handleChange] = useForm({
    email: "",
    password: "",
    showPassword: false,
  });

  const [validationErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const validateForm = () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setFormErrors({ emailError, passwordError });
    setIsFormValid(!emailError && !passwordError);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if (!isFormValid) {
      const firstError = Object.values(validationErrors).find((error) => error);
      if (!toast.isActive(toastId)) {
        const newToastId = toast.error(firstError || "Verifique os campos!", {
          autoClose: 3000,
          onClose: () => setToastId(null),
        });
        setToastId(newToastId);
      }
      return;
    }

    setIsSubmitting(true);

    const loadingToastId = showToast("Processando Login...", "loading");
    try {
      await login({ email: formData.email, password: formData.password });

      toast.update(loadingToastId, {
        render: "Login realizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(loadingToastId, {
        render: error.message || "Ocorreu um erro no login.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldsConfigs = () => [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: validationErrors.emailError,
    },
    {
      label: "Senha",
      type: formData.showPassword ? "text" : "password",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: validationErrors.passwordError,
      hasIcon: true,
    },
  ];

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
            rightsideInputs={getFieldsConfigs().map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Button
                key="1"
                addStatusClass={isFormValid ? "active" : "disabled"}
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
            role="alert"
            aria-live="assertive"
          />
        </RightSide>
      </Divisory>
      <Footer />
    </FullSize>
  );
}

export default App;
