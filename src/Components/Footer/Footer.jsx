import {
  FooterContainer,
  FooterContent,
  FooterInfos,
  InfosList,
  InfosUlis,
  InfosSpan,
  InfosLi,
  SocialMedia,
  SocialMediaSpan,
  SocialMediaItems,
  FooterDonation,
} from "./Footer.js";

import FacebookMedia from "../../Icons/FacebookMedia";
import XMedia from "../../Icons/XMedia";
import TiktokMedia from "../../Icons/TiktokMedia";
import InstagramMedia from "../../Icons/InstagramMedia";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterInfos>
          <InfosList>
            <InfosUlis>
              <InfosSpan>About</InfosSpan>
              <InfosLi>Terms</InfosLi>
              <InfosLi>Privacy</InfosLi>
              <InfosLi>Disclaimer</InfosLi>
              <InfosLi>Terms of Use</InfosLi>
            </InfosUlis>
            <InfosUlis>
              <InfosSpan>FAQ</InfosSpan>
              <InfosLi>Complaints Policy</InfosLi>
              <InfosLi>Cookies Notice</InfosLi>
              <InfosLi>DMCA</InfosLi>
              <InfosLi>USC 2257</InfosLi>
            </InfosUlis>
            <InfosUlis>
              <InfosSpan>Contact</InfosSpan>
              <InfosLi>Help</InfosLi>
              <InfosLi>Reference</InfosLi>
              <InfosLi>Standard Contract</InfosLi>
              <SocialMedia>
                <SocialMediaSpan>Share DoNation</SocialMediaSpan>
                <SocialMediaItems>
                  <FacebookMedia />
                  <XMedia />
                  <TiktokMedia />
                  <InstagramMedia />
                </SocialMediaItems>
              </SocialMedia>
            </InfosUlis>
          </InfosList>
          <FooterDonation className="footer-donation">
            © 2024 DoNation. All rights reserved.
          </FooterDonation>
        </FooterInfos>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
