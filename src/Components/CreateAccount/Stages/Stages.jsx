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
    birthday: null,
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
      [fieldName]: fieldName === "birthday" ? new Date(fieldValue) : fieldValue,
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
      if (errorField) {
        toast.error(errors[errorField]);
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

    // Formatação do telefone
    const formattedPhone = formatPhoneNumber(formData.phone);

    // Validação dos campos
    const { errors, isFormValid } = validateForm(
      formData,
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid && selectedGroupsSecondStep.length > 0);

    if (isFormValid && selectedGroupsSecondStep.length > 0) {
      try {
        const formattedBirthday = formData.birthday.toISOString().split("T")[0];

        // Envia os dados formatados
        await completeRegistrationProcess({
          phone: formattedPhone, // Usando o telefone formatado
          birthday: formattedBirthday,
          state: formData.state,
          city: formData.city,
          interests: selectedGroupsSecondStep,
        });

        toast.success("Cadastro realizado com sucesso!");
        setIsLoading(true);
        setTimeout(() => {
          navigate("/home");
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
