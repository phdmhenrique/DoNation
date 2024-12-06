import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

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
        ? "Password must contain 8-16 characters, uppercase, lowercase, numbers and symbols"
        : "",
      repeatPassword:
        !formData.repeatPassword && formData.password
          ? "Confirm password is required"
          : formData.password !== formData.repeatPassword
          ? "Password do not match"
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
      toast.success("The first step of registrations was sucessful!");

      setTimeout(() => {
        navigate("/create-account/stages");
      }, 2500);
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
      error: formErrors.username,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "youremail@gmail.com",
      name: "email",
      value: formData.email,
      onChange: handleChange,
      error: formErrors.email,
    },
    {
      label: "Password (Password must be between 8-16 characters)",
      type: formData.showPassword ? "text" : "password",
      placeholder: "A-Z,a-z,0-9,!@#",
      name: "password",
      value: formData.password,
      onChange: handleChange,
      error: formErrors.password,
      hasIcon: true,
    },
    {
      label: "Confirm Password",
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
              >
                Register
              </Button>,
              <Terms key={3}>
                By signing up, you agree to our{" "}
                <TermsHightlight>Terms of Service</TermsHightlight> and{" "}
                <TermsHightlight>Privacy Policy</TermsHightlight> and confirm
                that you are at least 18 years old.
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
              <>
                A total of 285 communities created.
                <br />
                Joining actions for a better world.
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
