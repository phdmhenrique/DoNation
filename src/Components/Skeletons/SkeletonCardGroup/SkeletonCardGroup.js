import styled from "styled-components";

export const SkeletonCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image content";
  grid-template-rows: auto;
  column-gap: 2.4rem;
  row-gap: 1rem;
  padding: 1.4rem;
  border-radius: 0.5rem;
  border: 0.2rem solid var(--gray-2);
  background-color: var(--gray-1);
  position: relative;

  .skeleton {
    background-color: var(--gray-2);
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }

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

export const SkeletonImage = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  grid-area: image;
  justify-self: center;
  border-radius: 50%;
`;

export const SkeletonContent = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "title title title"
    "demonstrator demonstrator demonstrator"
    "description description description"
    "address address address"
    "button button button";
  gap: 0.5rem;

  @media (max-width: 960px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "title title title"
      "demonstrator demonstrator demonstrator"
      "description description description"
      "address address address"
      "button button button";
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

export const SkeletonText = styled.div`
  height: 1.6rem;
  width: ${({ width }) => width || "100%"};
  margin-bottom: 0.8rem;

  &.title {
    grid-area: title;
  }

  &.description {
    grid-area: description;
  }

  &.address {
    grid-area: address;
  }
`;

export const SkeletonButton = styled.div`
  grid-area: button;
  width: 12rem;
  height: 3.2rem;
  border-radius: 0.4rem;
`;

export const SkeletonMemberImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  grid-area: demonstrator;
`;