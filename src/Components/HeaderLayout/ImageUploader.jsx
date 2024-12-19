import { ImageContainer } from "./GroupHeader.js";
import EditIcon from "../../Icons/EditIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";

const ImageUploader = ({
  isEditable,
  imageData,
  onImageChange,
  isImageSelected,
  placeholderImage = DefaultAvatar,
  altText = "Avatar",
  inputName,
}) => {
  return (
    <>
      {isEditable ? (
        <ImageContainer>
          <input
            type="file"
            name={inputName}
            accept="image/*"
            className="image-input"
            onChange={onImageChange}
          />
          <img
            className={`image-preview ${isImageSelected ? "selected" : ""}`}
            src={imageData?.previewUrl || placeholderImage}
            alt={altText}
          />
          <EditIcon />
        </ImageContainer>
      ) : (
        <img
          className="image-preview"
          src={imageData?.previewUrl || placeholderImage}
          alt={altText}
        />
      )}
    </>
  );
};

export default ImageUploader;
