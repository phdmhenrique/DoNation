// Global
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hooks
import useFormUserValidation from "../../hooks/useFormUserValidation.js";
import useFormState from "../../hooks/useFormState.js";
import useToastMessage from "../../hooks/useToastMessage.js";

// Contexts
import { useProfile } from "../../Contexts/ProfileContext.jsx";

// Icons
import { FaArrowLeft } from "react-icons/fa";
import LocationIcon from "../../Icons/LocationIcon.jsx";

// API
import { getUserImageUrl } from "../../api/axiosConfig.js";

// Components
import ImageUploader from "../../Components/HeaderLayout/ImageUploader.jsx";
import BioEditor from "../../Components/HeaderLayout/BioEditor.jsx";
import BasicInfoForm from "../../Components/HeaderLayout/BasicInfoForm.jsx";
import ActionButton from "../../Components/HeaderLayout/ActionButton.jsx";
import LandscapeUploader from "../../Components/HeaderLayout/LandscapeUploader.jsx";
import TitleAndUsername from "../../Components/HeaderLayout/TitleAndUsername.jsx";
import { CustomToastContainer } from "../../Components/Notification/Notification.jsx";
import {
  ComunityAddress,
  ComunityInfosAndBack,
  LazyLoadStyled,
  ComunityInformations,
  UserPhoto,
} from "../GroupDetails/GroupDetails.js";

// Estilos
import {
  ContainerEditable,
  ContainerWrapper,
} from "../../Components/HeaderLayout/GroupHeader.js";

const HeaderToEditProfile = ({ isEditable, initialData = {} }) => {
  const navigate = useNavigate();
  const { updateUserProfile } = useProfile();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const showToastMessage = useToastMessage();

  const validators = {
    name: (value) => (!value ? "Coloque seu nome para que te conheçam." : ""),
    username: (value) => (!value ? "O nome de usuário é obrigatório." : ""),
    userImage: (value) =>
      value === null ? "Escolha uma imagem de perfil." : "",
    landscapeImage: (value) =>
      value === null ? "Escolha uma imagem de fundo" : "",
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

    // Exibe o toast de "Processando..."
    const toastId = toast.loading("Processando...", {
      autoClose: false,
    });

    const updateUserRequest = {
      username: profileData.username,
      name: profileData.name,
    };

    const formData = new FormData();

    formData.append(
      "updateUserRequest",
      new Blob([JSON.stringify(updateUserRequest)], {
        type: "application/json",
      })
    );

    if (profileData.userImage?.file) {
      formData.append("imageFile", profileData.userImage.file);
    }

    if (profileData.landscapeImage?.file) {
      formData.append("landscapeFile", profileData.landscapeImage.file);
    }

    try {
      await updateUserProfile(formData);
      toast.update(toastId, {
        render: "Perfil atualizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Erro ao tentar atualizar o perfil.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        navigate(`/home`);
      }, 1000);
    }
  };

  const userImageUrl =
    profileData?.userImage?.previewUrl ||
    getUserImageUrl(profileData.userImage);
  const landscapeImageUrl =
    profileData?.landscapeImage?.previewUrl ||
    getUserImageUrl(profileData.landscapeImage);

  const formsToEditInfos = [
    {
      label: "Nome do Usuário",
      name: "name",
      value: profileData.name,
      placeholder: "Digite seu nome",
      htmlFor: "name",
    },
    {
      label: "Mude o Nome do Usuário",
      name: "username",
      value: profileData.username,
      placeholder: "Digite seu username",
      htmlFor: "username",
    },
  ];

  return (
    <ContainerWrapper>
      <LazyLoadStyled>
        <div className="shadow"></div>

        <LandscapeUploader
          isEditable={isEditable}
          imageData={landscapeImageUrl}
          onImageChange={handleImageChange}
          isBannerSelected={!!profileData?.landscapeImage}
          inputName="landscapeImage"
          altText="Banner do Grupo"
        />

        <UserPhoto>
          <ImageUploader
            isEditable={isEditable}
            imageData={userImageUrl}
            isImageSelected={!!profileData?.userImage}
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
              Registro, SP
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>
      </LazyLoadStyled>

      <ContainerEditable>
        <BioEditor
          bio={profileData.bio || ""}
          onChange={handleInputChange}
          inputName="bio"
          idValue="bio"
        />

        <BasicInfoForm fields={formsToEditInfos} onChange={handleInputChange} />

        <ActionButton
          onSave={handleSubmit}
          isSubmitting={isSubmitting}
          isFormValid={isFormValid}
        />
      </ContainerEditable>

      <CustomToastContainer
        toastStyle={{
          fontSize: "1.4rem",
        }}
      />
    </ContainerWrapper>
  );
};

export default HeaderToEditProfile;
