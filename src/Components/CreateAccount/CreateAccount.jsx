import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";
import { useAuth } from "../../Contexts/AuthContext.jsx";

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
import LoadingScreen from "../LoadingScreen/LoadingScreen.jsx";
import CustomFields from "../../Components/CustomFields/CustomFields.jsx";

import { Terms, TermsHightlight } from "./CreateAccount.js";
import {
  CustomToastContainer,
  showToast,
} from "../Notification/Notification.jsx";

function CreateAccount() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [toastId, setToastId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    showPassword: false,
  });

  const [formErrors, setFormErrors] = useState({
    fullNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName
        ? "Full Name is required"
        : /\d/.test(formData.fullName)
        ? "Full Name cannot contain numbers"
        : formData.fullName.length > 50 || formData.fullName.length < 3
        ? "Your name must have 3 to 50 characters."
        : "",
      username: !formData.username
        ? "Username is required"
        : !validator.isAlphanumeric(formData.username.replace(/\s/g, ""))
        ? "Username cannot contain spaces, special characters, or accents"
        : formData.username.length > 16 || formData.username.length < 3
        ? "Username must be between 3 and 16 characters"
        : "",
      email: !formData.email
        ? "Email is required"
        : !validator.isEmail(formData.email)
        ? "Invalid email"
        : /[A-Z]/.test(formData.email)
        ? "Email cannot contain uppercase letters."
        : !/\.com$|\.org$/i.test(formData.email.split("@")[1])
        ? "Invalid domain. Must end in .com or .org"
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
        ? "Password must contain 8-16 characters, uppercase, lowercase, numbers, and symbols"
        : "",
      repeatPassword:
        !formData.repeatPassword && formData.password
          ? "Confirm password is required"
          : formData.password !== formData.repeatPassword
          ? "Passwords do not match"
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
      if (!toast.isActive(toastId)) {
        const newToastId = toast.error(formErrors[errorField], {
          autoClose: 3000,
          onClose: () => setToastId(null),
        });
        setToastId(newToastId);
      }
      return;
    }

    if (!isSubmitting) {
      setIsSubmitting(true);

      const loadingToastId = showToast("Processing Registration...", "loading");
      setToastId(loadingToastId);

      try {
        await signup({
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        toast.update(loadingToastId, {
          render: "The first step of registration was successful!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setTimeout(() => {
          setIsSubmitting(false);
          navigate("/");
        }, 3000);

      } catch (error) {
        toast.update(loadingToastId, {
          render:
            error.message ||
            "An error occurred during registration. Check the fields.",
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
      label: "Full Name",
      type: "text",
      placeholder: "Your Full Name",
      name: "fullName",
      value: formData.fullName,
      onChange: handleChange,
      error: formErrors.fullNameError,
    },
    {
      label: "Username",
      type: "text",
      placeholder: "YourUsername",
      name: "username",
      value: formData.username,
      onChange: handleChange,
      error: formErrors.usernameError,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "youremail@gmail.com",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: formErrors.emailError,
    },
    {
      label: "Password (Password must be between 8-16 characters)",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: formErrors.passwordError,
      hasIcon: true,
    },
    {
      label: "Confirm Password",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "repeatPassword",
      value: formData.repeatPassword,
      onChange: handleChange,
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
          DonationTitles={["#Share", "#Inspire", "#Transform"]}
          customClasses="leftside__more-titles"
          imgPath={imageBanner}
          alt="Donation Logo"
        />
        <RightSide>
          <Login
            pageTitle="Sign Up"
            rightsideInputs={fieldsConfigs.map((config) => (
              <CustomFields key={config.name} {...config} />
            ))}
            formButtons={[
              <Link to="/" key="no-key">
                <Button key={1} addStatusClass="inactive">
                  Cancel
                </Button>
              </Link>,
              <Button
                key={2}
                addStatusClass={isButtonEnabled ? "active" : "disabled"}
                onClick={handleSubmit}
                isDisabled={isLoading || isSubmitting}
              >
                Register
              </Button>,
              <Terms key={3}>
                By signing up, you agree to our{" "}
                <TermsHightlight>Terms of Service</TermsHightlight> and{" "}
                <TermsHightlight>Privacy Policy</TermsHightlight> and confirm that you are at least 18 years old.
              </Terms>,
            ]}
          />

          <NoAccount className="no-account">
            Already have an account?{" "}
            <LinkStyled to="/" className="link">
              Log in now
            </LinkStyled>
          </NoAccount>

          <SocialMedia
            message={
              <React.Fragment>
                A total of 285 communities created.
                <br />
                Joining actions for a better world.
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
