import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import validations from "../../utils/validation.js";

import useFormState from "../../hooks/useFormState.js";
import useFormValidation from "../../hooks/useFormValidation.js";
import useToastMessage from "../../hooks/useToastMessage.js";

import FullSize from "../../Components/FullSize/FullSize.jsx";
import Divisory from "../../Components/Divisory/Divisory.jsx";
import LeftSide from "../../Components/LeftSide/LeftSide.jsx";
import RightSide from "../../Components/RightSide/RightSide.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import LinkStyled from "../../Components/LinkStyled/LinkStyled.js";
import Login from "../../Components/RightSide/Login/Login.jsx";
import NoAccount from "../../Components/RightSide/Account/Account.jsx";
import Button from "../../Components/Button/Button.jsx";
import SocialMedia from "../../Components/RightSide/SocialMedia/SocialMedia.jsx";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen.jsx";
import CustomFields from "../../Components/CustomFields/CustomFields.jsx";

import { Terms, TermsHightlight } from "./CreateAccount.js";
import { CustomToastContainer } from "../../Components/Notification/Notification.jsx";

function CreateAccount() {
  useEffect(() => {
    document.title = "DoNation - Criar Conta";
  }, []);

  const { signup, isLoading } = useAuth();
  const showToastMessage = useToastMessage();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const { formData, validationErrors, isFormValid, handleChange } =
    useFormValidation({
      initialState: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        showPassword: false,
      },
      validators: {
        fullName: validations.validateFullName,
        username: validations.validateUsername,
        email: validations.validateEmail,
        password: validations.validatePassword,
        repeatPassword: (value) =>
          validations.validateRepeatPassword(value, formData.password),
      },
    });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!isFormValid) {
        const firstError = Object.values(validationErrors).find(
          (error) => error
        );
        showToastMessage(firstError || "Verifique os campos!", "error");
        return;
      }

      setIsSubmitting(true);

      try {
        await signup({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        toast.update({
          render: error.message || "Ocorreu um erro no cadastro.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      isFormValid,
      validationErrors,
      formData,
      signup,
      showToastMessage,
      setIsSubmitting,
    ]
  );

  const getFieldsConfigs = () => [
    {
      label: "Nome Completo",
      type: "text",
      placeholder: "Seu Nome Completo",
      name: "fullName",
      value: formData.fullName,
      onChange: handleChange,
      error: validationErrors.fullName || "",
    },
    {
      label: "Nome de Usuário",
      type: "text",
      placeholder: "Seunomedeusuario",
      name: "username",
      value: formData.username,
      onChange: handleChange,
      error: validationErrors.username || "",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "seuemail@gmail.com",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: validationErrors.email || "",
    },
    {
      label: "Senha",
      type: formData.showPassword ? "text" : "password",
      name: "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      value: formData.password,
      onChange: handleChange,
      error: validationErrors.password || "",
      hasIcon: true,
    },
    {
      label: "Repetir a Senha",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "repeatPassword",
      value: formData.repeatPassword,
      onChange: handleChange,
      error: validationErrors.repeatPassword || "",
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
          DonationTitles={["#Compartilhe", "#Inspire", "#Transforme"]}
          customClasses="leftside__more-titles"
          alt="Donation Logo"
        />
        <RightSide>
          <Login
            pageTitle="Cadastrar"
            rightsideInputs={getFieldsConfigs().map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Link to="/" key="no-key">
                <Button addStatusClass="inactive">Cancelar</Button>
              </Link>,
              <Button
                key="submit"
                addStatusClass={isFormValid ? "active" : "disabled"}
                onClick={handleSubmit}
                isDisabled={isSubmitting}
              >
                Cadastrar
              </Button>,
              <Terms key="terms">
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
              <>
                Total de 285 comunidades criadas.
                <br />
                Unindo Ações para um Mundo Melhor.
              </>
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
