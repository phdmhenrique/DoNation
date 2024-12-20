import { Link, useNavigate } from "react-router-dom";

// Context
import { useGroup } from "../../Contexts/GroupContext.jsx";

// Hooks
import useFormState from "../../hooks/useFormState.js";
import useFormValidation from "../../hooks/useFormValidation.js";
import useToastMessage from "../../hooks/useToastMessage.js";

// Componentes
import ImageUploader from "../../Components/HeaderLayout/ImageUploader.jsx";
import LandscapeUploader from "../../Components/HeaderLayout/LandscapeUploader.jsx";
import BasicInfoForm from "../../Components/HeaderLayout/BasicInfoForm.jsx";
import BioEditor from "../../Components/HeaderLayout/BioEditor.jsx";
import GroupInterestsSelector from "../../Components/HeaderLayout/GroupInterestsSelector.jsx";
import ActionButton from "../../Components/HeaderLayout/ActionButton.jsx";
import TitleAndUsername from "../../Components/HeaderLayout/TitleAndUsername.jsx";

// Notifications
import { CustomToastContainer } from "../../Components/Notification/Notification.js";

// Estilos
import {
  ContainerEditable,
  ContainerWrapper,
} from "../../Components/HeaderLayout/GroupHeader.js";
import {
  ComunityAddress,
  ComunityInfosAndBack,
  LazyLoadStyled,
  ComunityInformations,
  ComunityName,
  UserPhoto,
} from "../GroupDetails/GroupDetails.js";

// Icons
import LocationIcon from "../../Icons/LocationIcon.jsx";
import { FaArrowLeft } from "react-icons/fa";

const HeaderToCreateGroup = ({ isEditable, initialData = {} }) => {
  const navigate = useNavigate();
  const { registerNewGroup } = useGroup();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const showToastMessage = useToastMessage();

  const validators = {
    comunityTitle: (value) =>
      !value ? "O título da comunidade é obrigatório." : "",
    comunityAddress: (value) =>
      !value ? "O endereço da comunidade é obrigatório." : "",
    comunityDescription: (value) =>
      value.length < 10 ? "A descrição deve ter no mínimo 10 caracteres." : "",
    comunityInterests: (value) =>
      value.length < 1 ? "Escolha pelo menos um grupo de interesse." : "",
    comunityImage: (value) =>
      value === null ? "Coloque uma imagem no grupo." : "",
    comunityBanner: (value) =>
      value === null ? "Coloque uma imagem de banner no grupo." : "",
  };

  const {
    formData: groupData,
    validationErrors,
    isFormValid,
    handleChange,
  } = useFormValidation({ initialState: initialData, validators });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "comunityTitle") {
      const sanitizedValueToComunityUsername = value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .replace(/\s+/g, "");

      handleChange("comunityUsername", sanitizedValueToComunityUsername);
    }

    handleChange(name, value);
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      handleChange(name, { file, previewUrl });
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      Object.values(validationErrors).forEach((error) =>
        showToastMessage(error, "error")
      );
      return;
    }

    setIsSubmitting(true);
    showToastMessage("Salvando grupo...", "info", true);

    const formData = new FormData();
    formData.append(
      "createGroupRequest",
      new Blob(
        [
          JSON.stringify({
            name: groupData.comunityTitle,
            description: groupData.comunityDescription,
            address: groupData.comunityAddress,
            tags: groupData.comunityInterests,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (groupData.comunityImage?.file) {
      formData.append("imageFile", groupData.comunityImage.file);
    }

    if (groupData.comunityBanner?.file) {
      formData.append("landscapeFile", groupData.comunityBanner.file);
    }

    try {
      await registerNewGroup(formData);
      showToastMessage("Grupo registrado com sucesso!", "success");
    } catch (error) {
      showToastMessage("Erro ao tentar cadastrar o grupo.", "error");
    } finally {
      setTimeout(() => {
        navigate(`/home/group/@${groupData.comunityUsername}`);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled>
        <div className="shadow"></div>

        <LandscapeUploader
          isEditable={isEditable}
          imageData={groupData.comunityBanner}
          onImageChange={handleImageChange}
          isBannerSelected={!!groupData?.comunityBanner}
          inputName="comunityBanner"
          altText="Banner do Grupo"
        />

        <UserPhoto>
          <ImageUploader
            isEditable={isEditable}
            imageData={groupData.comunityImage}
            isImageSelected={!!groupData?.comunityImage}
            onImageChange={handleImageChange}
            inputName="comunityImage"
            altText="Imagem do Grupo"
          />

          <TitleAndUsername
            title={groupData?.comunityTitle}
            username={groupData?.comunityUsername}
            defaultTitle="Nome da Comunidade"
            defaultUsername="nomedacomunidade"
          />
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityName>
              <p>
                {groupData?.comunityTitle
                  ? groupData.comunityTitle
                  : "Nome Da Comunidade"}
              </p>
            </ComunityName>
            <ComunityAddress>
              <LocationIcon />
              {groupData?.comunityAddress
                ? groupData.comunityAddress
                : "Endereço da Comunidade"}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>
      </LazyLoadStyled>

      {isEditable && (
        <ContainerEditable>
          <BioEditor
            bio={groupData?.comunityDescription || ""}
            onChange={handleInputChange}
            inputName="comunityDescription"
            idValue="comunityDescription"
          />

          <BasicInfoForm
            fields={[
              {
                label: "Nome do Grupo",
                name: "comunityTitle",
                value: groupData?.comunityTitle,
                placeholder: "Nome Da Comunidade",
                htmlFor: "comunityTitle",
              },
              {
                label: "Localidade",
                name: "comunityAddress",
                value: groupData?.comunityAddress,
                placeholder: "Registro, São Paulo",
                htmlFor: "comunityAddress",
              },
            ]}
            onChange={handleInputChange}
          />

          <GroupInterestsSelector
            selected={groupData?.comunityInterests || []}
            onChange={(interests) =>
              handleInputChange({
                target: { name: "comunityInterests", value: interests },
              })
            }
          />

          <ActionButton
            onSave={handleSubmit}
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
          />
        </ContainerEditable>
      )}

      <CustomToastContainer
        toastStyle={{
          fontSize: "1.4rem",
        }}
      />
    </ContainerWrapper>
  );
};

export default HeaderToCreateGroup;
