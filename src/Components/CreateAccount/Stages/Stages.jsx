import React, { useState, useEffect } from "react";
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
import StageInputs from "../../Stage/StageInputs.jsx";
import InterestGroup from "../../InterestGroup/InterestGroup.jsx";
import LoadingScreen from "../../LoadingScreen/LoadingScreen.jsx";
import { CustomToastContainer } from "../../Notification/Notification.js";

import { validateForm } from "./ValidationForm.js"; // Importe a função de validação

import imageBanner from "../../../Assets/donation-banner.png";

function Stages() {
  const navigate = useNavigate();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    cellphone: "",
    date: new Date(),
    state: "",
    city: "",
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
    setSelectedInterests(selectedGroupsSecondStep);
  };

  const handleUpdateFormData = (fieldName, fieldValue) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  const handleFirstStepValidation = () => {
    const { errors, isFormValid } = validateForm(formData, activeTab, selectedGroupsSecondStep);
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
    const { errors, isFormValid } = validateForm(formData, activeTab, selectedGroupsSecondStep);
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid);

    if (isFormValid && selectedGroupsSecondStep.length > 0) {
      toast.success("Cadastro realizado com sucesso!");
      setIsLoading(true);
      setTimeout(() => {
        navigate("/home");
      }, 1300);
    } else {
      setIsButtonEnabled(false);
      toast.error("Selecione ao menos um grupo de interesse.");
    }
  };

  const handleGroupSelectionChange = (updatedGroups) => {
    if (activeTab === 2) {
      setSelectedGroupsSecondStep(updatedGroups);
    } else {
      setSelectedInterests(updatedGroups);
    }
  };

  useEffect(() => {
    const { errors, isFormValid } = validateForm(formData, activeTab, selectedGroupsSecondStep);
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid);
  }, [formData, selectedInterests, selectedGroupsSecondStep, activeTab]);

  const stateOptions = [
    { value: "none", label: "Selecionar" },
    { value: "sp", label: "São Paulo" },
    { value: "rj", label: "Rio de Janeiro" },
    { value: "mg", label: "Minas Gerais" },
    { value: "ba", label: "Bahia" },
    { value: "pr", label: "Paraná" },
    { value: "am", label: "Amazonas" },
  ];

  const cityOptions = [
    { value: "none", label: "Selecionar" },
    { value: "saopaulo", label: "São Paulo" },
    { value: "registro", label: "Registro" },
    { value: "cajati", label: "Cajati" },
    { value: "jacupiranga", label: "Jacupiranga" },
    { value: "pariquera-acu", label: "Pariquera-Açu" },
    { value: "juquia", label: "Juquiá" },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["#Cultive", "#Manifeste", "#Impacte"]}
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
                Prepare-se… <br /> A uma página de distância <br /> de usar o
                DoNation
              </React.Fragment>
            }
            rightsideInputs={[
              activeTab === 1 ? (
                <StageInputs
                  formData={formData}
                  updateFormData={handleUpdateFormData}
                  stateOptions={stateOptions}
                  cityOptions={cityOptions}
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
                  {activeTab === 1 ? "Sair" : "Voltar"}
                </Button>
              </Link>,
              activeTab === 1 ? (
                <Button
                  key="continue"
                  onClick={handleFirstStepValidation}
                  disabled={!isButtonEnabled}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  key="confirm"
                  onClick={handleSecondStepValidation}
                  disabled={!isButtonEnabled}
                >
                  Confirmar
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
