import { ImageContainer } from "./GroupHeader.js";
import DefaultCover from "../../Assets/default-cover.png";

const LandscapeUploader = ({
  isEditable,
  imageData,
  onImageChange,
  isBannerSelected,
  placeholderImage = DefaultCover, 
  altText = "Banner", 
  inputName
}) => (
  <div className="container-register_image">
    <ImageContainer>
      {isEditable ? (
        <>
          <input
            type="file"
            name={inputName}
            accept="image/*"
            className="image-input"
            onChange={onImageChange}
          />
          <img
            className={`image-preview ${isBannerSelected ? "selected" : ""}`}
            src={imageData?.previewUrl || placeholderImage}
            alt={altText}
          />
        </>
      ) : (
        <img
          className="image-preview"
          src={imageData?.previewUrl || placeholderImage}
            alt={altText}
        />
      )}
    </ImageContainer>
  </div>
);

export default LandscapeUploader;
