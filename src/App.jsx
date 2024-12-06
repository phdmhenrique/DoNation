import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validator from "validator";
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
        ? "Email is required"
        : !validator.isEmail(formData.email)
        ? "Invalid email"
        : "",
      password: !formData.password
        ? "Password is required"
        : !validator.isStrongPassword(String(formData.password), {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
          })
        ? "Password must be 8-16 characters long, with uppercase, lowercase, numbers, and symbols"
        : "",
    };

    setFormErrors(errors);
    setIsButtonEnabled(Object.values(errors).every((error) => !error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    const errorField = Object.keys(formErrors).find((key) => formErrors[key]);

    if (errorField) {
      toast.error(formErrors[errorField]);
    } else {
      setIsLoading(true);
      toast.success("Login sucessful!");
      setTimeout(() => {
        navigate("/home");
        // redirecionamento para a próxima página ou lógica adicional.
      }, 2000);
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
      label: "Password",
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
            pageTitle="Sign In"
            rightsideInputs={fieldsConfigs.map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Button
                key="1"
                addStatusClass={isButtonEnabled ? "active" : "disabled"}
                onClick={handleSubmit}
              >
                Sign In
              </Button>,
              <RightSideButtons__Span key="2">
                Forgot your passsword?
              </RightSideButtons__Span>,
            ]}
          />

          <NoAccount className="no-account">
            Don't have an account?{" "}
            <LinkStyled to="/create-account" className="link">
              Create Account
            </LinkStyled>
          </NoAccount>

          <SocialMedia
            message={
              <>
                Share, Inspire, Transform.
                <br />
                Uniting Actions for a Better World.
              </>
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
