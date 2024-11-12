import React from "react";
import { LeftSideContainer, TitleList, TitleItem, ImageBanner } from "./LeftSide.ts";
import ImageBannerLink from "../../Assets/donation-banner.png";

interface LeftSideProps {
  DonationTitles: string[];
  customClasses?: string;
  bold?: number;
  altImg: string;
}

function LeftSide({ DonationTitles, customClasses, bold, altImg }: LeftSideProps) {  
  return (
    <LeftSideContainer className="leftside">
      <TitleList className={`leftside__title ${customClasses}`}>
        {DonationTitles.map((DonationTitle, index) => (
          <TitleItem key={index} className={bold === index ? "bold" : "fw300"}>
            {DonationTitle}
          </TitleItem>
        ))}
      </TitleList>
      <ImageBanner src={ImageBannerLink} alt={altImg} className="img-banner" />
    </LeftSideContainer>
  );
}

export default LeftSide;
