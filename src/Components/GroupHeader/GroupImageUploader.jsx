import { ImageContainer } from "./GroupHeader.js";
import EditIcon from "../../Icons/EditIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";

const GroupImageUploader = ({ isEditable, groupData, onImageChange, isImageSelected }) => {
  return (
    <>
      {isEditable ? (
        <ImageContainer>
          <input
            type="file"
            name="comunityImage"
            accept="image/*"
            className="image-input"
            onChange={onImageChange}
          />
          <img
            className={`image-preview ${isImageSelected ? "selected" : ""}`}
            src={groupData.comunityImage?.previewUrl || DefaultAvatar}
            alt={groupData.comunityTitle || "Avatar da Comunidade"}
          />
          <EditIcon />
        </ImageContainer>
      ) : (
        <img
          className="image-preview"
          src={groupData.comunityImage?.previewUrl || DefaultAvatar}
          alt={groupData.comunityTitle}
        />
      )}
    </>
  );
};

export default GroupImageUploader;
