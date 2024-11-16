import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../Contexts/AuthContext.jsx";

import FullSize from "../../FullSize/FullSize.jsx";
import Divisory from "../../Divisory/Divisory.jsx";
import LeftSide from "../../LeftSide/LeftSide.jsx";
import RightSide from "../../RightSide/RightSide.jsx";
import Footer from "../../Footer/Footer.jsx";
import Login from "../../RightSide/Login/Login.jsx";
import Button from "../../Button/Button.jsx";
import StageInputs from "../../StageInputs/StageInputs.jsx";
import InterestGroup from "../../InterestGroup/InterestGroup.jsx";
import {
  CustomToastContainer,
  showToast,
} from "../../Notification/Notification.jsx";
import { validateForm } from "./ValidationForm.js";
import imageBanner from "../../../Assets/donation-banner.png";

function Stages() {
  const navigate = useNavigate();
  const { completeRegistrationProcess } = useAuth();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastId, setToastId] = useState(false);
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    phone: "",
    birthday: currentDate,
    state: "none",
    city: "none",
    interests: [],
  });

  const [formErrors, setFormErrors] = useState({
    phone: "",
    birthday: "",
    state: "",
    city: "",
    interests: "",
  });

  const handleBackButton = () => {
    setActiveTab(1);
  };

  const handleUpdateFormData = (fieldName, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldName === "birthday" ? fieldValue : fieldValue,
    }));
  };

  const handleFirstStepValidation = async () => {
    const { errors, isFormValid } = validateForm(
      formData,
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid);

    if (isFormValid) {
      setActiveTab(2);
    } else {
      const errorField = Object.keys(errors).find((key) => errors[key]);

      if (errorField && !isSubmitting) {
        if (!toast.isActive(toastId)) {
          const newToastId = toast.error(formErrors[errorField], {
            autoClose: 3000,
            onClose: () => setToastId(null),
          });
          setToastId(newToastId);
        }
        return;
      }
    }
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, ""); // Remove qualquer caractere não numérico
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`; // Formato esperado
    } else {
      return phone; // Caso o número não tenha o tamanho esperado, retorna sem formatação
    }
  };

  const handleSecondStepValidation = async (e) => {
    e.preventDefault();

    const formattedPhone = formatPhoneNumber(formData.phone);
    const { errors, isFormValid } = validateForm(
      formData,
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid && selectedGroupsSecondStep.length > 0);

    if (!isFormValid) {
      if (errors.interests && !toast.isActive(toastId)) {
        const newToastId = toast.error(errors.interests, {
          autoClose: 3000,
          onClose: () => setToastId(null),
        });
        setToastId(newToastId);
      }
      return;
    }

    if (!isSubmitting) {
      setIsSubmitting(true);

      const loadingToastId = showToast(
        "Processing Complete Registration...",
        "loading"
      );
      setToastId(loadingToastId);

      try {             
        await completeRegistrationProcess({
          phone: formattedPhone,
          birthday: formData.birthday.date,
          state: formData.state,
          city: formData.city,
          interests: selectedGroupsSecondStep,
        });

        toast.update(loadingToastId, {
          render: "Registration completed successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } catch (error) {
        toast.update(loadingToastId, {
          render: error.message === "Ivalid Data" ? error.message = "The date of birth must be a past date!" : error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } finally {
        setIsSubmitting(false);
        setIsButtonEnabled(false);
      }
    }
  };

  const handleGroupSelectionChange = (updatedGroups) => {
    setSelectedGroupsSecondStep(updatedGroups);
  };

  useEffect(() => {
    const { errors, isFormValid } = validateForm(
      formData,
      activeTab,
      selectedGroupsSecondStep
    );
    if (activeTab === 1) {
      setIsButtonEnabled(isFormValid);
    } else if (activeTab === 2) {
      setIsButtonEnabled(selectedGroupsSecondStep.length > 0);
    }
    setFormErrors(errors);
  }, [formData, selectedGroupsSecondStep, activeTab]);

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["#Cultivate", "#Manifest", "#Impact"]}
          customClasses="leftside__more-titles"
          imgPath={imageBanner}
          alt="Donation Logo"
        />
        <RightSide>
          <Login
            showTabs={true}
            activeTab={activeTab}
            pageTitle={
              <React.Fragment>
                Get ready… <br /> You are one step away <br /> from using
                DoNation
              </React.Fragment>
            }
            rightsideInputs={[
              activeTab === 1 ? (
                <StageInputs
                  formData={formData}
                  updateFormData={handleUpdateFormData}
                />
              ) : (
                <InterestGroup
                  key="interest-group"
                  onGroupSelectionChange={handleGroupSelectionChange}
                  selectedGroups={selectedGroupsSecondStep}
                />
              ),
            ]}
            formButtons={[
              <Link
                to={activeTab === 1 ? "/" : "/create-account/stages"}
                key="no-key"
              >
                <Button addStatusClass="inactive" onClick={handleBackButton}>
                  {activeTab === 1 ? "Exit" : "Back"}
                </Button>
              </Link>,
              activeTab === 1 ? (
                <Button
                  key="continue"
                  onClick={handleFirstStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
                  isDisabled={isSubmitting}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  key="confirm"
                  onClick={handleSecondStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
                  isDisabled={isSubmitting}
                >
                  Confirm
                </Button>
              ),
            ]}
          />
        </RightSide>
      </Divisory>
      <Footer />
      <CustomToastContainer toastStyle={{ fontSize: "1.4rem" }} />
    </FullSize>
  );
}

export default Stages;
