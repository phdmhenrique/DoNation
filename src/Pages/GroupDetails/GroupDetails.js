import styled from "styled-components";
import LazyLoad from "react-lazyload";
import { ButtonCreateOrEditGroup } from "../../Components/NavCreateGroup/NavCreateGroup.js";
import { Tab, TabList, TabsContainer } from "../../Components/Tabs/Tabs.js";

export const LazyLoadStyled = styled(LazyLoad)`
  width: 100%;
  min-height: 38rem;
  background-color: var(--white);
  position: relative;

  & .shadow {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    box-shadow: -1rem -5rem 15rem 4.5rem var(--black);
    z-index: 1;
  }

  & .details-to-delete {
    position: absolute;
    top: 1.2rem;
    right: 1.3rem;
    z-index: 5;
    font-size: 2.4rem;
    color: var(--white);
    cursor: pointer;
    transition: 0.2s ease all;

    &:hover {
      color: var(--primary);
    }
  }

  /* Estilos para o dropdown */
  .dropdown-menu {
    position: absolute;
    top: 4.5rem;
    right: 1.3rem;
    background: var(--white);
    border: 1px solid var(--gray-2);
    border-radius: 0.4rem;
    padding: 0.8rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    user-select: none;
  }

  .dropdown-menu button {
    background: var(--primary); /* Cor do botão */
    color: var(--white);
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 1.4rem;
    transition: background-color 0.2s ease;

    &:hover {
      background: var(--quinary); /* Cor ao passar o mouse */
    }
  }

  & .container-register_image {
    width: 100%;
    height: 32rem;
    display: flex;
    align-items: center;
    justify-content: center;

    & .register_image {
      width: 100%;
      height: 100%;
    }
  }

  & img {
    width: 100%;
    height: 32rem;
    object-fit: cover;
    outline: 0.2rem solid var(--gray-2);
  }

  @media (max-width: 840px) {
    min-height: 43rem;
  }

  @media (max-width: 390px) {
    min-height: 48rem;
  }
`;

export const UserPhoto = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  display: flex;
  border-radius: 50%;
  outline: 0.2rem solid var(--white);
  position: absolute;
  bottom: 0;
  left: 1.3rem;

  @media (max-width: 840px) {
    bottom: 5rem;
  }

  @media (max-width: 390px) {
    bottom: 10rem;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ComunityUsername = styled.div`
  width: max-content;
  height: fit-content;
  position: absolute;
  left: 12rem;
  top: 5.5rem;
  bottom: 0;
  color: var(--gray-0);

  & p {
    font-size: var(--font__20);
    font-weight: 700;

    @media (max-width: 390px) {
      font-size: var(--font__16);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  & p + p {
    font-size: var(--font__14);
  }
`;

export const ComunityInfosAndBack = styled.div`
  display: flex;
  position: absolute;
  top: 1.2rem;
  left: 1.3rem;
  gap: 1.6rem;
  z-index: 2;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--white);
  }
`;

export const ComunityInformations = styled.div`
  width: 100%;
  max-width: fit-content;
  padding: 0.4rem;

  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border-radius: 0.4rem;
`;

export const ComunityName = styled.h1`
  font-size: var(--font__20);
  font-weight: 700;
  color: var(--gray-0);
`;

export const ComunityAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font__12);
  color: var(--gray-0);
  font-weight: 700;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & path {
    fill: var(--black);
  }
`;

export const ButtonCreateOrEditGroupStyled = styled(ButtonCreateOrEditGroup)`
  position: absolute;
  right: 1.3rem;
  top: 1.2rem;

  @media (max-width: 455px) {
    top: 26.5rem;
  }
`;

export const ButtonsInviteAndShare = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  position: absolute;
  gap: 1.2rem;
  right: 1.3rem;
  bottom: 4rem;

  @media (max-width: 840px) {
    right: 0;
    left: 1.3rem;
    bottom: 0rem;
    margin-right: 1.3rem;
  }

  @media (max-width: 390px) {
    grid-template-columns: max-content;
  }
`;

export const ButtonInviteOrShare = styled.button`
  height: min-content;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  background-color: var(--white);
  color: var(--primary);
  border: 0.1rem solid var(--primary);
  padding: 0.8rem 1.2rem;
  font-size: var(--font__16);
  font-weight: 700;
  border-radius: 5rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: var(--primary);
    color: var(--white);

    & svg {
      fill: var(--white);
    }
  }

  & svg {
    width: 2rem;
    height: 2rem;
    fill: var(--primary);
    transition: 0.3s ease;
  }
`;

export const ContainerTabs = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid var(--gray-2);
`;

export const TabContainerStyled = styled(TabsContainer)`
  margin: 2rem 1.4rem 0 1.4rem;
  width: auto;
`;

export const TabListStyled = styled(TabList)`
  max-width: 100rem;
  display: flex;
  margin: 4.3rem auto 0 auto;
`;

export const TabStyled = styled(Tab)``;
