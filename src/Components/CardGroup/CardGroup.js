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
  grid-template-columns: auto 1fr;
  grid-template-areas: "image content";
  grid-template-rows: auto;
  column-gap: 2.4rem;
  padding: 1.4rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--gray-2);
  background-color: var(--white);

  @media (max-width: 960px) {
    grid-template-rows: auto auto;
    grid-template-areas:
      "image content"
      "image button";
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

export const ContentCard = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  grid-template-areas:
    "title title button"
    "demonstrator demonstrator button"
    "description description description"
    "address address address";
  gap: 0.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title title"
      "demonstrator demonstrator"
      "description description"
      "address address"
      "button button";
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "demonstrator"
      "description"
      "address"
      "button";
  }
`;

export const Title = styled.div`
  grid-area: title;
  font-size: var(--font__18);
  color: var(--primary);
  font-weight: 700;
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

  & span {
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
  }
`;

export const Description = styled.div`
  grid-area: description;
  color: var(--gray-pure);
  font-size: var(--font__12);
  font-weight: 500;
  line-height: 1.2rem;
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

  &:hover {
    background-color: #ff4242;
  }

  @media (max-width: 960px) {
    align-self: center;
  }
`;

export const PhotoUsersFromGroup = styled.div`
  width: 100%;
  max-width: 8.6rem;
  display: flex;
  align-items: center;
  position: relative;

  & div {
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 50%;
    border: 0.1rem solid var(--white);
    background-color: black;
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
