import { Link } from "react-router-dom";

// Context
import { useGroup } from "../../Contexts/GroupContext.jsx";

// Hooks
import useFormState from "../../hooks/useFormState";
import useFormValidation from "../../hooks/useFormValidation";
import useToastMessage from "../../hooks/useToastMessage";

// Componentes
import GroupImageUploader from "./GroupImageUploader.jsx";
import GroupLandscapeUploader from "./GroupLandscapeUploader";
import GroupBasicInfoForm from "./GroupBasicInfoForm";
import GroupBioEditor from "./GroupBioEditor";
import GroupInterestsSelector from "./GroupInterestsSelector";
import GroupActions from "./GroupActions";
import GroupTitleAndUsername from "./GroupTitleAndUsername.jsx";

// Notifications
import { CustomToastContainer } from "../Notification/Notification.js"

// Estilos
import { ContainerEditable, ContainerWrapper } from "./GroupHeader.js";
import {
  ComunityAddress,
  ComunityInfosAndBack,
  LazyLoadStyled,
  ComunityInformations,
  ComunityName,
  UserPhoto,
} from "../../Pages/GroupDetails/GroupDetails.js";

// Icons
import LocationIcon from "../../Icons/LocationIcon.jsx";
import { FaArrowLeft } from "react-icons/fa";

const GroupHeader = ({ isEditable, initialData = {} }) => {
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
    comunityInterests: (value) => value.length < 1 ? "Escolha pelo menos um grupo de interesse." : "",
    comunityImage: (value) => value === null ? "Coloque uma imagem no grupo." : "",
    comunityBanner: (value) => value === null ? "Coloque uma imagem de banner no grupo." : "",
  };

  const {
    formData: groupData,
    validationErrors,
    isFormValid,
    handleChange,
  } = useFormValidation({ initialState: initialData, validators });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      setIsSubmitting(false);
    }
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled>
        <div className="shadow"></div>

        <GroupLandscapeUploader
          isEditable={isEditable}
          groupData={groupData}
          onImageChange={handleImageChange}
          isBannerSelected={!!groupData?.comunityBanner}
        />

        <UserPhoto>
          <GroupImageUploader
            isEditable={isEditable}
            groupData={groupData}
            isImageSelected={!!groupData?.comunityImage}
            onImageChange={handleImageChange}
          />

          <GroupTitleAndUsername
            title={groupData?.comunityTitle}
            username={groupData?.comunityUsername}
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
          <GroupBioEditor
            bio={groupData?.comunityDescription || ""}
            onChange={handleInputChange}
          />

          <GroupBasicInfoForm data={groupData} onChange={handleInputChange} />

          <GroupInterestsSelector
            selected={groupData?.comunityInterests || []}
            onChange={(interests) =>
              handleInputChange({
                target: { name: "comunityInterests", value: interests },
              })
            }
          />

          <GroupActions
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

export default GroupHeader;
