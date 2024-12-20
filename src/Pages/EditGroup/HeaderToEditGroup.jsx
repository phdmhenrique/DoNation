import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFormUserValidation from "../../hooks/useFormUserValidation.js";
import useFormState from "../../hooks/useFormState.js";
import useToastMessage from "../../hooks/useToastMessage.js";
import { useEditGroup } from "../../Contexts/EditGroupContext.jsx";

import { FaArrowLeft } from "react-icons/fa";
import LocationIcon from "../../Icons/LocationIcon.jsx";

import { getGroupImageUrl } from "../../api/axiosConfig.js";

import ImageUploader from "../../Components/HeaderLayout/ImageUploader.jsx";
import BasicInfoForm from "../../Components/HeaderLayout/BasicInfoForm.jsx";
import ActionButton from "../../Components/HeaderLayout/ActionButton.jsx";
import LandscapeUploader from "../../Components/HeaderLayout/LandscapeUploader.jsx";
import TitleAndUsername from "../../Components/HeaderLayout/TitleAndUsername.jsx";
import BioEditor from "../../Components/HeaderLayout/BioEditor";
import GroupInterestsSelector from "../../Components/HeaderLayout/GroupInterestsSelector";
import { CustomToastContainer } from "../../Components/Notification/Notification.js";

import {
  ComunityAddress,
  ComunityInfosAndBack,
  LazyLoadStyled,
  ComunityInformations,
  UserPhoto,
  ComunityName,
} from "../GroupDetails/GroupDetails.js";

import {
  ContainerEditable,
  ContainerWrapper,
} from "../../Components/HeaderLayout/GroupHeader.js";

const HeaderToEditGroup = ({ isEditable, initialData = {}, groupName }) => {
  const navigate = useNavigate();
  const { updateGroupProfile } = useEditGroup();
  const { isSubmitting, setIsSubmitting } = useFormState();
  const showToastMessage = useToastMessage();

  // Update validators to include length checks
  const validators = {
    name: (value) => {
      if (!value) return "Digite o nome do grupo.";
      if (value.length > 30)
        return "O nome do grupo deve ter no máximo 30 caracteres.";
      return "";
    },
    address: (value) => {
      if (!value) return "O endereço é obrigatório.";
      if (value.length > 50)
        return "O endereço deve ter no máximo 50 caracteres.";
      return "";
    },
    groupImage: (value) =>
      value === null ? "Escolha uma imagem para o grupo." : "",
    landscapeImage: (value) =>
      value === null ? "Escolha uma imagem de fundo" : "",
  };

  // Sanitize group name for username
  const sanitizeGroupName = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "")
      .replace(/\s+/g, "");
  };

  // Format username for display (remove leading @)
  const formatUsername = (username) => {
    return username.startsWith("@") ? username.slice(1) : username;
  };

  // Initialize form data with formatted username
  const {
    formData: groupData,
    validationErrors,
    isFormValid,
    handleChange,
  } = useFormUserValidation({
    initialState: {
      ...initialData,
      groupname: formatUsername(initialData.groupname || ""),
      description: initialData.description || "",
      tags: initialData.tags || [],
    },
    validators,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Apply length restrictions
    if (name === "name" && value.length > 30) return;
    if (name === "address" && value.length > 50) return;

    handleChange(name, value);

    // Update groupname when name changes
    if (name === "name") {
      const sanitizedGroupname = sanitizeGroupName(value);
      handleChange("groupname", sanitizedGroupname);
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      handleChange(name, { file, previewUrl });
    }
  };

  const handleInterestsChange = (selectedInterests) => {
    handleChange("tags", selectedInterests);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      Object.values(validationErrors).forEach((error) =>
        showToastMessage(error, "error")
      );
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Processando...", {
      autoClose: false,
    });

    const updateGroupRequest = {
      name: groupData.name,
      description: groupData.description,
      address: groupData.address,
      groupname: `@${groupData.groupname}`, // Add @ back for API submission
      groupImage: groupData.groupImage?.id
        ? {
            id: groupData.groupImage.id,
            name: groupData.groupImage.name,
            imageLink: groupData.groupImage.imageLink,
          }
        : null,
      landscapeImage: groupData.landscapeImage?.id
        ? {
            id: groupData.landscapeImage.id,
            name: groupData.landscapeImage.name,
            imageLink: groupData.landscapeImage.imageLink,
          }
        : null,
      tags: groupData.tags,
    };

    const formData = new FormData();

    formData.append(
      "updateGroupRequest",
      new Blob([JSON.stringify(updateGroupRequest)], {
        type: "application/json",
      })
    );

    if (groupData.groupImage?.file) {
      formData.append("imageFile", groupData.groupImage.file);
    }

    if (groupData.landscapeImage?.file) {
      formData.append("landscapeFile", groupData.landscapeImage.file);
    }

    try {
      await updateGroupProfile(groupName, formData);
      toast.update(toastId, {
        render: "Grupo atualizado com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
    } catch (error) {
      toast.update(toastId, {
        render: "Erro ao tentar atualizar o grupo.",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setTimeout(() => {
        navigate(`/home/group/@${groupData.groupname}`);
      setIsSubmitting(false);

      }, 1000);
    }
  };

  const groupImageUrl =
    groupData?.groupImage?.previewUrl || getGroupImageUrl(groupData.groupImage);
  const landscapeImageUrl =
    groupData?.landscapeImage?.previewUrl ||
    getGroupImageUrl(groupData.landscapeImage);

  const formsToEditInfos = [
    {
      label: "Nome do Grupo",
      name: "name",
      value: groupData.name,
      placeholder: "Digite o nome do grupo",
      htmlFor: "name",
    },
    {
      label: "Endereço",
      name: "address",
      value: groupData.address,
      placeholder: "Digite o endereço do grupo",
      htmlFor: "address",
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
          isBannerSelected={!!groupData?.landscapeImage}
          inputName="landscapeImage"
          altText="Banner do Grupo"
        />

        <UserPhoto>
          <ImageUploader
            isEditable={isEditable}
            imageData={groupImageUrl}
            isImageSelected={!!groupData?.groupImage}
            onImageChange={handleImageChange}
            inputName="groupImage"
            altText="Imagem do Grupo"
          />

          <TitleAndUsername
            title={groupData?.name}
            username={`@${groupData?.groupname}`} // Add @ only for display
            defaultTitle="Nome do Grupo"
            defaultUsername="nomedogrupo"
          />
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to={`/home/group/${groupName}`}>
            <FaArrowLeft />
          </Link>

          <ComunityInformations>
            <ComunityName>{groupData.name || "Nome do Grupo"}</ComunityName>

            <ComunityAddress>
              <LocationIcon />
              {groupData.address || "Endereço do grupo"}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>
      </LazyLoadStyled>

      <ContainerEditable>
        <BioEditor
          bio={groupData.description}
          onChange={handleInputChange}
          inputName="description"
          idValue="groupDescription"
        />

        <BasicInfoForm fields={formsToEditInfos} onChange={handleInputChange} />

        <GroupInterestsSelector
          selected={groupData.tags}
          onChange={handleInterestsChange}
        />

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

export default HeaderToEditGroup;
