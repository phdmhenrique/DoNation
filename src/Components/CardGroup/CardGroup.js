import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Card = styled.div`
  width: 100%;
  display: grid;
  column-gap: 2.4rem;
  padding: 1.4rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--gray-2);
  background-color: var(--gray-1);
  position: relative;

  ${({ $isRequestView }) =>
    $isRequestView
      ? `
        grid-template-columns: 11.2rem 1fr 11.2rem;
        grid-template-areas:
          "image content imageGroup"
          "image content imageGroup"
          "containerToButtons containerToButtons containerToButtons";
        grid-template-rows: auto;
      `
      : `
        grid-template-columns: auto 1fr;
        grid-template-areas: "image content";
        grid-template-rows: auto;
      `}

  .owner-star {
    position: absolute;
    left: -1.1rem;
    top: -1.1rem;
    font-size: 2rem;
    color: var(--secondary);
  }

  @media (max-width: 960px) {  
    ${({ $isRequestView }) => 
    $isRequestView ? `
      grid-template-rows: auto auto;
    grid-template-areas:
      "image content imageGroup"
      "image button";
    ` : `
    grid-template-rows: auto auto;
    grid-template-areas:
      "image content"
      "image button";`
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "image"
      "content"
      "button";
  }
`;

export const ImageCard = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  grid-area: image;
  justify-self: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ImageGroup = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  grid-area: imageGroup;
  justify-self: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ContentCard = styled.div`
  ${({ $isRequestView }) =>
    $isRequestView
      ? `
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-wrap: wrap;
      `
      : `
        grid-area: content;
        display: grid;
        gap: 0.5rem;
        grid-template-columns: 1fr 1fr auto;
        grid-template-areas:
          "title title button"
          "demonstrator demonstrator button"
          "description description description"
          "address address address";
      `}

  @media (max-width: 960px) {
    ${({ $isRequestView }) =>
      $isRequestView
        ? `
          grid-template-areas:
            "imageUser title imageGroup"
            "imageUser demonstrator imageGroup"
            "imageUser description imageGroup"
            "buttonRecuse buttonAccept buttonAccept";
        `
        : `
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "title title"
            "demonstrator demonstrator"
            "description description"
            "address address"
            "button button";
        `}
  }

  @media (max-width: 480px) {
    ${({ $isRequestView }) =>
      $isRequestView
        ? `
          grid-template-areas:
            "imageUser"
            "title"
            "imageGroup"
            "demonstrator"
            "description"
            "buttonRecuse"
            "buttonAccept";
        `
        : `
          grid-template-columns: 1fr;
          grid-template-areas:
            "title"
            "demonstrator"
            "description"
            "address"
            "button";
        `}
  }
`;

export const Title = styled.div`
  grid-area: title;
  font-size: var(--font__18);
  color: var(--primary);

  & strong {
    border-bottom: 0.2rem solid var(--primary);
  }

  & span {
    font-weight: 700;
  }
`;

export const Demonstrator = styled.div`
  grid-area: demonstrator;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & path {
    stroke: var(--primary);
  }
`;

export const PhotoUserUnit = styled.span`
  font-size: var(--font__12);
  font-weight: 600;
  color: var(--gray-6);
  overflow: hidden;
`;

export const InfoNumberOfDonation = styled.span`
  font-size: var(--font__16);
  border-radius: 0.3rem;
  font-weight: 400;
  color: var(--gray-5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  strong {
    font-weight: 700;
  }
`;

export const Description = styled.div`
  grid-area: description;
  color: var(--gray-pure);
  font-size: var(--font__12);
  font-weight: 500;
  line-height: 1.2rem;
  padding: 1.5rem 0;
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  grid-area: address;
  color: var(--gray-pure);
  font-size: var(--font__12);
  font-weight: 700;
  line-height: 1.2rem;
`;

export const JoinButton = styled.button`
  grid-area: button;
  align-self: start;
  padding: 0.9rem 3.6rem;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $isRequested }) =>
    $isRequested &&
    `
      color: var(--white);
  `}

  &:hover {
    background-color: var(--quinary);
  }

  ${({ $isRequested }) =>
    $isRequested &&
    `
      &:hover {
        background-color: var(--quinary);
    }
  `}

  @media (max-width: 960px) {
    align-self: center;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  grid-area: containerToButtons;

  & button {
    width: 8rem;
    height: min-content;
    display: flex;
    justify-content: center;
    padding: 1rem;
    
    color: var(--primary);
    background-color: var(--white);
    border: 0.1rem solid var(--primary);
    border-radius: 0.4rem;
    font-weight: bold;
    cursor: pointer;

  }
`;

// Adicione estilos específicos para os botões
export const ButtonRecuse = styled.button`
  transition: all 0.2s ease;

  &:hover {
    color: var(--white);
    background-color: var(--primary);
    border: 0.1rem solid var(--primary);
  }
`;

export const ButtonAccept = styled.button`

  transition: all 0.2s ease;

  &:hover {
    color: var(--white);
    background-color: var(--tertiary);
    border: 0.1rem solid var(--tertiary);
  }
`;

export const PhotoUsersFromGroup = styled.div`
  width: 100%;
  max-width: 9.6rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  position: relative;

  & div {
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    outline: 0.2rem solid var(--white);
    background-color: var(--white-smoke);
    position: absolute;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  & div:nth-child(1) {
    left: 0;
  }
  & div:nth-child(2) {
    left: 1.5rem;
  }
  & div:nth-child(3) {
    left: 3rem;
  }
  & div:nth-child(4) {
    left: 4.5rem;
  }
  & div:nth-child(5) {
    left: 6rem;
  }
  & div:nth-child(6) {
    left: 7.5rem;
  }
`;
