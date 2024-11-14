import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "./ValidationForm";
import { useAuth } from "../../../Contexts/AuthContext";

import {
  FullSize,
  Divisory,
  LeftSide,
  RightSide,
  Footer,
} from "../../../AppComponents.ts";

import Login from "../../RightSide/Login/Login.tsx";
import Button from "../../Button/Button.tsx";
import StageInputs from "../../StageInputs/StageInputs.tsx";
import InterestGroup from "../../InterestGroup/InterestGroup.tsx";
import {
  CustomToastContainer,
  showToast,
} from "../../Notification/Notification.tsx";

interface FormData {
  phone: string;
  birthday: { date: string; isValidDate: boolean };
  state: string;
  city: string;
  interests: string[];
}

interface FormErrors {
  phone: string;
  birthday: string;
  state: string;
  city: string;
  interests: string;
}

function Stages() {
  const navigate = useNavigate();
  const { completeRegistrationProcess } = useAuth();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastId, setToastId] = useState<string | number | null>(null);
  const [selectedGroupsSecondStep, setSelectedGroupsSecondStep] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(1);

  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    birthday: { date: currentDate, isValidDate: false },
    state: "none",
    city: "none",
    interests: [],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    phone: "",
    birthday: "",
    state: "",
    city: "",
    interests: "",
  });

  const handleBackButton = () => {
    setActiveTab(1);
  };

  const handleUpdateFormData = (
    fieldName: keyof FormData, 
    fieldValue: string | { date: string; isValidDate: boolean }
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldName === "birthday" && typeof fieldValue === "object"
        ? fieldValue
        : fieldValue,
    }));
  };
  

  useEffect(() => {
    console.log("formData atualizado:", formData);
  }, [formData]);
  

  const handleFirstStepValidation = async () => {
    const { errors, isFormValid } = validateForm(
      { ...formData, birthday: formData.birthday.date },
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid);

    if (isFormValid) {
      setActiveTab(2);
    } else {
      const errorField = Object.keys(errors).find((key) => errors[key as keyof FormErrors]);

      if (errorField && !isSubmitting) {
        if (!toast.isActive(toastId!)) {
          const newToastId = toast.error(formErrors[errorField as keyof FormErrors], {
            autoClose: 3000,
            onClose: () => setToastId(null),
          });
          setToastId(newToastId);
        }
        return;
      }
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)})${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else {
      return phone;
    }
  };

  const handleSecondStepValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedPhone = formatPhoneNumber(formData.phone);
    const { errors, isFormValid } = validateForm(
      { ...formData, birthday: formData.birthday.date },
      activeTab,
      selectedGroupsSecondStep
    );
    setFormErrors(errors);
    setIsButtonEnabled(isFormValid && selectedGroupsSecondStep.length > 0);

    if (!isFormValid) {
      if (errors.interests && !toast.isActive(toastId!)) {
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

      const loadingToastId = showToast("Processando Cadastro Completo...", "loading") || "default-toast-id";
      setToastId(loadingToastId);

      try {             
        await completeRegistrationProcess({
          phone: formattedPhone,
          birthday: formData.birthday,
          state: formData.state,
          city: formData.city,
          interests: selectedGroupsSecondStep,
        });

        toast.update(loadingToastId, {
          render: "Cadastro realizado com sucesso!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } catch (error: any) {
        toast.update(loadingToastId, {
          render: error.message === "Invalid Data" 
            ? "A data de nascimento deve ser uma data passada!" 
            : error.message,
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

  const handleGroupSelectionChange = (updatedGroups: string[]) => {
    setSelectedGroupsSecondStep(updatedGroups);
  };

  useEffect(() => {
    const { errors, isFormValid } = validateForm(
      { ...formData, birthday: formData.birthday.date },
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
          DonationTitles={["#Cultive", "#Manifeste", "#Impacte"]}
          customClasses="leftside__more-titles"
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
                  {activeTab === 1 ? "Sair" : "Voltar"}
                </Button>
              </Link>,
              activeTab === 1 ? (
                <Button
                  key="continue"
                  onClick={handleFirstStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
                  isDisabled={isSubmitting}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  key="confirm"
                  onClick={handleSecondStepValidation}
                  addStatusClass={isButtonEnabled ? "active" : "disabled"}
                  isDisabled={isSubmitting}
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
