import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FullSize from "../../FullSize/FullSize.jsx";
import Divisory from "../../Divisory/Divisory.jsx";
import LeftSide from "../../LeftSide/LeftSide.jsx";
import RightSide from "../../RightSide/RightSide.jsx";
import Footer from "../../Footer/Footer.jsx";
import Login from "../../RightSide/Login/Login.jsx";
import Button from "../../Button/Button.jsx";
import StageInputs from "../../StageInputs/StageInputs.jsx";
import InterestGroup from "../../InterestGroup/InterestGroup.jsx";
import LoadingScreen from "../../LoadingScreen/LoadingScreen.jsx";
import { CustomToastContainer } from "../../Notification/Notification.js";

import { validateForm } from "./ValidationForm.js"; // Importe a função de validação

import imageBanner from "../../../Assets/donation-banner.png";

function Stages() {
  const navigate = useNavigate();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    cellphone: "",
    date: new Date(),
    state: "none",
    city: "none",
    interests: [],
  });

  const [formErrors, setFormErrors] = useState({
    cellphone: "",
    date: "",
    state: "",
    city: "",
    interests: "",
  });

  const handleBackButton = () => {
    setActiveTab(1);
  };

  const handleUpdateFormData = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  const handleFirstStepValidation = () => {
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
      if (errorField) {
        toast.error(errors[errorField]);
      }
    }
  };

  const handleSecondStepValidation = (e) => {
    e.preventDefault();
    const { errors, isFormValid } = validateForm(
      formData,
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid && selectedGroupsSecondStep.length > 0);

    if (isFormValid && selectedGroupsSecondStep.length > 0) {
      toast.success("Registration completed successfully!");
      setIsLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 1300);
    } else {
      setIsButtonEnabled(false);
      toast.error("Select at least one interest group.");
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

  if (isLoading) {
    return <LoadingScreen />;
  }

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
              <>
                Get ready… <br /> You are one step away <br /> from using
                DoNation
              </>
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
                to={
                  activeTab === 1 ? "/create-account" : "/create-account/stages"
                }
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
                >
                  Continue
                </Button>
              ) : (
                <Button
                  key="confirm"
                  onClick={handleSecondStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
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
