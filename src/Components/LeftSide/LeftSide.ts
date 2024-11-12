import styled from "styled-components";

export const LeftSideContainer = styled.section`
  width: 50%;
  min-width: 36rem;
  min-height: 87rem;
  position: relative;

  /* Media Queries */
  @media (max-width: 738px) {
    display: none;
  }
`;

export const TitleList = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &.leftside__more-titles {
    padding: 0 5.5rem !important;
    align-items: flex-start !important;
  }
`;

export const TitleItem = styled.li`
  color: var(--white);
  font-size: 10rem;
  overflow-x: hidden;

  @media (max-width: 1370px) {
    font-size: 8rem;
  }

  @media (max-width: 1164px) {
    font-size: 6rem;
  }

  @media (max-width: 960px) {
    font-size: 4.5rem;
  }

  &.bold::after {
    content: "Nation";
    font-weight: bold;
  }

  &.fw300 {
    font-weight: 300;
  }
`;

export const ImageBanner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
