import { ImageContainer } from "./GroupHeader.js";
import DefaultCover from "../../Assets/default-cover.png";

const GroupLandscapeUploader = ({
  isEditable,
  groupData,
  onImageChange,
  isBannerSelected,
}) => (
  <div className="container-register_image">
    <ImageContainer>
      {isEditable ? (
        <>
          <input
            type="file"
            name="comunityBanner"
            accept="image/*"
            className="image-input"
            onChange={onImageChange}
          />
          <img
            className={`image-preview ${isBannerSelected ? "selected" : ""}`}
            src={groupData?.comunityBanner?.previewUrl || DefaultCover}
            alt={groupData?.comunityTitle || "Avatar da Comunidade"}
          />
        </>
      ) : (
        <img
          className="image-preview"
          src={groupData?.previewUrl || DefaultCover}
          alt={groupData?.comunityTitle || "Avatar da Comunidade"}
        />
      )}
    </ImageContainer>
  </div>
);

export default GroupLandscapeUploader;
