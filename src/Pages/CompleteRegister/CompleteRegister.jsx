import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Contexts/AuthContext.jsx";

import FullSize from "../../Components/FullSize/FullSize.jsx";
import Divisory from "../../Components/Divisory/Divisory.jsx";
import LeftSide from "../../Components/LeftSide/LeftSide.jsx";
import RightSide from "../../Components/RightSide/RightSide.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import Login from "../../Components/RightSide/Login/Login.jsx";
import Button from "../../Components/Button/Button.jsx";
import StageInputs from "../../Components/StageInputs/StageInputs.jsx";
import InterestGroup from "../../Components/InterestGroup/InterestGroup.jsx";
import { CustomToastContainer } from "../../Components/Notification/Notification.jsx";

import validations from "../../utils/validation.js";
import useFormState from "../../hooks/useFormState.js";
import useToastMessage from "../../hooks/useToastMessage.js";
import useFormValidation from "../../hooks/useFormValidation.js";

function CompleteRegister() {
  useEffect(() => {
    document.title = "DoNation - Completar Cadastro";
  }, []);

  const navigate = useNavigate();
  const { completeRegistrationProcess } = useAuth();
  const showToastMessage = useToastMessage();
  const { isSubmitting, setIsSubmitting, isButtonEnabled, setIsButtonEnabled } =
    useFormState();
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  // Validações dinâmicas baseadas na aba ativa
  const validators = useMemo(() => {
    if (activeTab === 1) {
      return {
        phone: validations.validatePhone,
        birthday: validations.validateBirthday,
        state: validations.validateState,
        city: validations.validateCity,
      };
    }

    if (activeTab === 2) {
      return {
        interests: validations.validateInterests,
      };
    }

    return {};
  }, [activeTab]);

  const { formData, validationErrors, isFormValid, handleChange } =
    useFormValidation({
      initialState: {
        phone: "",
        birthday: new Date().toISOString().split("T")[0],
        state: "none",
        city: "none",
        interests: [],
      },
      validators,
    });

  useEffect(() => {
    const canEnableButton =
      (activeTab === 1 && isFormValid) ||
      (activeTab === 2 && selectedGroupsSecondStep.length > 0);
    setIsButtonEnabled(canEnableButton);
  }, [isFormValid, activeTab, selectedGroupsSecondStep, setIsButtonEnabled]);

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    return cleaned.length === 11
      ? `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
      : phone;
  };

  const handleFirstStepValidation = () => {
    const firstStepFields = ["phone", "birthday", "state", "city"];
    const firstStepErrors = firstStepFields.some(
      (field) => validationErrors[field]
    );

    if (firstStepErrors) {
      const errorField = firstStepFields.find(
        (field) => validationErrors[field]
      );
      showToastMessage(validationErrors[errorField], "error");
      return;
    }

    setActiveTab(2);
  };

  const handleSecondStepValidation = async (e) => {
    e.preventDefault();

    if (!selectedGroupsSecondStep.length) {
      showToastMessage("Selecione ao menos um grupo de interesse!", "error");
      return;
    }

    const formattedPhone = formatPhoneNumber(formData.phone);
    setIsSubmitting(true);
    showToastMessage("Completando cadastro...", "info", true);

    try {
      await completeRegistrationProcess({
        phone: formattedPhone,
        birthday: formData.birthday.date,
        state: formData.state,
        city: formData.city,
        interests: selectedGroupsSecondStep,
      });
      showToastMessage("Cadastro realizado com sucesso!", "success", false);
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      const errorMessage =
        error.message === "Ivalid Data"
          ? "A data de nascimento deve ser uma data passada!"
          : error.message;
      showToastMessage(errorMessage, "error", false);
    } finally {
      setIsSubmitting(false);
      setIsButtonEnabled(false);
    }
  };

  const handleGroupSelectionChange = (updatedGroups) =>
    setSelectedGroupsSecondStep(updatedGroups);

  const tabComponents = {
    1: <StageInputs formData={formData} updateFormData={handleChange} />,
    2: (
      <InterestGroup
        key="interest-group"
        onGroupSelectionChange={handleGroupSelectionChange}
        selectedGroups={selectedGroupsSecondStep}
        title="Quais são os seus grupos de interesse?"
      />
    ),
  };

  const buttonComponents = {
    1: (
      <Button
        onClick={handleFirstStepValidation}
        addStatusClass={isButtonEnabled ? "active" : "disabled"}
        isDisabled={isSubmitting}
      >
        Continuar
      </Button>
    ),
    2: (
      <Button
        onClick={handleSecondStepValidation}
        addStatusClass={isButtonEnabled ? "active" : "disabled"}
        isDisabled={isSubmitting}
      >
        Confirmar
      </Button>
    ),
  };

  return (
    <FullSize>
      <Divisory>
        <LeftSide
          DonationTitles={["#Cultive", "#Manifeste", "#Impacte"]}
          customClasses="leftside__more-titles"
          alt="Donation Logo"
        />
        <RightSide>
          <Login
            showTabs={true}
            activeTab={activeTab}
            pageTitle={
              <>
                Prepare-se… <br /> A uma página de distância <br /> de usar o
                DoNation
              </>
            }
            rightsideInputs={[tabComponents[activeTab]]}
            formButtons={[
              <Link
                to={activeTab === 1 ? "/" : "/complete-register"}
                key="back"
              >
                <Button
                  addStatusClass="inactive"
                  onClick={() => setActiveTab(1)}
                >
                  {activeTab === 1 ? "Sair" : "Voltar"}
                </Button>
              </Link>,
              buttonComponents[activeTab],
            ]}
          />
        </RightSide>
      </Divisory>
      <Footer />
      <CustomToastContainer toastStyle={{ fontSize: "1.4rem" }} />
    </FullSize>
  );
}

export default CompleteRegister;
