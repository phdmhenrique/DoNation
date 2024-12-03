import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./Contexts/AuthContext.jsx";
import { validateEmail, validatePassword } from "./utils/validation.js";

import useFormValidaton from "./hooks/useFormValidation.js";
import useFormState from "./hooks/useFormState.js";
import useToastMessage from "./hooks/useToastMessage.js";

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
import { CustomToastContainer } from "./Components/Notification/Notification.jsx";

const App = () => {
  useEffect(() => {
    document.title = "DoNation - Login";
  }, []);

  const { login } = useAuth();
  const showToastMessage = useToastMessage();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const { formData, validationErrors, isFormValid, handleChange } =
    useFormValidaton({
      initialState: {
        email: "",
        password: "",
        showPassword: false,
      },
      validators: {
        email: (value) => validateEmail(value),
        password: (value) => validatePassword(value),
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
        await login({ email: formData.email, password: formData.password });
      } catch (error) {
        toast.update({
          render: error.message || "Ocorreu um erro no login.",
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
      login,
      setIsSubmitting,
      showToastMessage,
    ]
  );

  const getFieldsConfigs = () => [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: validationErrors?.email || "",
    },
    {
      label: "Senha",
      type: formData.showPassword ? "text" : "password",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: validationErrors?.password || "",
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
              <>
                Compartilhe, Inspire, Transforme.
                <br />
                Unindo Ações para um Mundo Melhor.
              </>
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
};

export default App;