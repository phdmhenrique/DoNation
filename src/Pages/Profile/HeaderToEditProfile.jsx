import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../../Contexts/ProfileContext.jsx";
import useFormState from "../../hooks/useFormState.js";
import useToastMessage from "../../hooks/useToastMessage.js";
import ImageUploader from "../../Components/HeaderLayout/ImageUploader.jsx";
import BioEditor from "../../Components/HeaderLayout/BioEditor.jsx"; 
import BasicInfoForm from "../../Components/HeaderLayout/BasicInfoForm.jsx";
import ActionButton from "../../Components/HeaderLayout/ActionButton.jsx";

import { getUserImageUrl } from "../../api/axiosConfig.js";

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
import LandscapeUploader from "../../Components/HeaderLayout/LandscapeUploader.jsx";
import TitleAndUsername from "../../Components/HeaderLayout/TitleAndUsername.jsx";
import { FaArrowLeft } from "react-icons/fa";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import useFormUserValidation from "../../hooks/useFormUserValidation.js";

const HeaderToEditProfile = ({ isEditable, initialData = {} }) => {
  const navigate = useNavigate();
  const { updateProfile } = useProfile();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const showToastMessage = useToastMessage();

  const validators = {
    username: (value) => (!value ? "O nome de usuário é obrigatório." : ""),
    email: (value) => (!value ? "O e-mail é obrigatório." : ""),
    bio: (value) => {
      const bioValue = value || ""; // Garante que bio seja sempre uma string
      return bioValue.length < 10
        ? "A bio deve ter no mínimo 10 caracteres."
        : ""; 
    },
    profileImage: (value) =>
      value === null ? "Escolha uma imagem de perfil." : "",
  };

  const {
    formData: profileData,
    validationErrors,
    isFormValid,
    handleChange,
  } = useFormUserValidation({ initialState: initialData, validators });

  const handleInputChange = (e) => {
    handleChange(e.target.name, e.target.value);
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
    showToastMessage("Atualizando perfil...", "info", true);

    const formData = new FormData();
    formData.append(
      "profileData",
      new Blob([JSON.stringify(profileData)], { type: "application/json" })
    );

    if (profileData.profileImage?.file) {
      formData.append("profileImage", profileData.profileImage.file);
    }

    try {
      await updateProfile(formData);
      showToastMessage("Perfil atualizado com sucesso!", "success");
    } catch (error) {
      showToastMessage("Erro ao tentar atualizar o perfil.", "error");
    } finally {
      navigate(`/home/profile/${profileData.username}`);
      setIsSubmitting(false);
    }
  };

  console.log(profileData.userImage);
  const userImageUrl = getUserImageUrl(profileData.userImage);


  return (
    <ContainerWrapper>
      <LazyLoadStyled>
        <div className="shadow"></div>

        <LandscapeUploader
          isEditable={isEditable}
          imageData={profileData.landscapeImage}
          onImageChange={handleImageChange}
          isBannerSelected={!!profileData?.landscapeImage}
          inputName="landscapeImage"
          altText="Banner do Grupo"
        />

        <UserPhoto>
          <ImageUploader
            isEditable={isEditable}
            imageData={userImageUrl}
            onImageChange={handleImageChange}
            inputName="userImage"
            altText="Imagem de Perfil"
          />

          <TitleAndUsername
            title={profileData?.name}
            username={profileData?.username}
            defaultTitle="Seu nome"
            defaultUsername="seunome"
          />
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityAddress>
              <LocationIcon />
              {profileData?.comunityAddress
                ? profileData.comunityAddress
                : "Endereço da Comunidade"}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>
      </LazyLoadStyled>

      <BioEditor
        bio={profileData?.comunityDescription || ""}
        onChange={handleInputChange}
        inputName="comunityDescription"
        idValue="comunityDescription"
      />

      <BasicInfoForm
        fields={[
          {
            label: "Nome do Usuário",
            name: "username",
            value: profileData.username,
            placeholder: "Digite seu nome",
            htmlFor: "username",
          },
          {
            label: "E-mail",
            name: "email",
            value: profileData.email,
            placeholder: "Digite seu e-mail",
            htmlFor: "email",
          },
        ]}
        onChange={handleInputChange}
      />

      <BioEditor
        bio={profileData.bio || ""}
        onChange={handleInputChange}
        inputName="bio"
        idValue="bio"
      />

      <ActionButton
        onSave={handleSubmit}
        isSubmitting={isSubmitting}
        isFormValid={isFormValid}
      />
    </ContainerWrapper>
  );
};

export default HeaderToEditProfile;
