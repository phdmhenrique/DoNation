import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 144rem;
  max-width: 100%;
  margin: 0 auto;
`;

export const FooterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 7rem 4.1rem 0 4.1rem;

  @media (max-width: 738px) {
    padding: 7rem 2rem 0 !important;
  }
`;

export const FooterInfos = styled.div`
  width: 100.9rem;
  max-width: 100%;
  min-height: 32.1rem;
  border-top: 0.1rem solid var(--white-smoke);
  background-color: var(--white);
  padding: 4.1rem 4.1rem 0 4.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 738px) {
    padding: 4.1rem 0 0 !important;
  }
`;

export const InfosList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;

  @media (max-width: 505px) {
    justify-content: space-around !important;
  }

  @media (max-width: 323px) {
    justify-content: flex-start !important;
  }
`;

export const InfosUlis = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfosSpan = styled.span`
  color: var(--gray-4);
  font-size: var(--font__14);
  font-weight: 700;
  padding-bottom: 0.5rem;
`;

export const InfosLi = styled.li`
  color: var(--black);
  font-size: var(--font__14);
  font-weight: 500;
  cursor: pointer;
`;

export const SocialMedia = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
`;

export const SocialMediaSpan = styled.span`
  color: var(--gray-6);
  font-size: var(--font__14);
  font-weight: 700;
`;

export const SocialMediaItems = styled.div`
  display: flex;
  gap: 1.1rem;
  align-items: center;
  justify-content: space-between;
`;

export const FooterDonation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font__14);
  color: var(--black-opacity75);
  padding: 2rem 0;
`;
