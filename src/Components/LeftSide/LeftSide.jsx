import { LeftSideContainer, TitleList, TitleItem, ImageBanner } from "./LeftSide.js";
import imageBanner from "../../Assets/donation-banner.png";

function LeftSide({ DonationTitles, customClasses, bold, altImg }) {
  return (
    <LeftSideContainer className="leftside">
      <TitleList className={`leftside__title ${customClasses}`}>
        {DonationTitles.map((DonationTitle, index) => (
          <TitleItem key={index} className={bold === index ? "bold" : "fw300"}>{DonationTitle}</TitleItem>
        ))}
      </TitleList>
      <ImageBanner src={imageBanner} alt={altImg} className="img-banner" />
    </LeftSideContainer>
  );
}

export default LeftSide;
