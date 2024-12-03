import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Hooks
import useGroupForm from "../../hooks/useGroupForm";

// Componentes
import GroupImageUploader from "./GroupImageUploader.jsx";
import GroupLandscapeUploader from "./GroupLandscapeUploader";
import GroupBasicInfoForm from "./GroupBasicInfoForm";
import GroupBioEditor from "./GroupBioEditor";
import GroupInterestsSelector from "./GroupInterestsSelector";
import GroupActions from "./GroupActions";

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
import GroupTitleAndUsername from "./GroupTitleAndUsername.jsx";

const GroupHeader = ({ isEditable, initialData, onSave }) => {
  const { groupData, handleInputChange, handleImageChange } =
    useGroupForm(initialData);

  const handleSubmit = () => {
    onSave(groupData);
  };

  return (
    <ContainerWrapper>
      <LazyLoadStyled>
        <div className="shadow"></div>

        <GroupLandscapeUploader
          isEditable={isEditable}
          groupData={groupData}
          onImageChange={handleImageChange}
          isBannerSelected={!!groupData.comunityBanner}
        />

        <UserPhoto>
          <GroupImageUploader
            isEditable={isEditable}
            groupData={groupData}
            isImageSelected={!!groupData.comunityImage}
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
            bio={groupData.comunityDescription || ""}
            onChange={handleInputChange}
          />

          <GroupBasicInfoForm data={groupData} onChange={handleInputChange} />

          <GroupInterestsSelector
            selected={groupData.comunityInterests || []}
            onChange={(interests) =>
              handleInputChange({
                target: { name: "comunityInterests", value: interests },
              })
            }
          />

          <GroupActions onSave={handleSubmit} />
        </ContainerEditable>
      )}
    </ContainerWrapper>
  );
};

export default GroupHeader;
