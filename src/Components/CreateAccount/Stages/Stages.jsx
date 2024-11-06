import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../../Contexts/AuthContext.jsx';

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
  const { completeRegistrationProcess } = useAuth();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    birthday: new Date(),
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
    setFormData((prevData) => ({ ...prevData, [fieldName]: fieldValue }));
  };

  const handleFirstStepValidation = async () => {
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

  const handleSecondStepValidation = async (e) => {
    e.preventDefault();
    console.log("Data de nascimento antes da validação:", formData.birthday);
    const { errors, isFormValid } = validateForm(formData, activeTab, selectedGroupsSecondStep);
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid && selectedGroupsSecondStep.length > 0);
  
    if (isFormValid && selectedGroupsSecondStep.length > 0) {
      try {
        // Envia os dados da segunda etapa para completar o registro
        await completeRegistrationProcess({
          phone: formData.phone,
          birthday: formData.birthday,
          state: formData.state,
          city: formData.city,
          interests: selectedGroupsSecondStep, // Assumindo que isso é um array de tags
        });
  
        toast.success("Cadastro realizado com sucesso!");
        setIsLoading(true);
        setTimeout(() => {
          navigate("/");
        }, 1300);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setIsButtonEnabled(false);
      toast.error("Selecione ao menos um grupo de interesse.");
    }
  };

  const handleGroupSelectionChange = (updatedGroups) => {
    setSelectedGroupsSecondStep(updatedGroups);
  };

  useEffect(() => {
    const { errors, isFormValid } = validateForm(formData, activeTab, selectedGroupsSecondStep);
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
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  key="confirm"
                  onClick={handleSecondStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
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