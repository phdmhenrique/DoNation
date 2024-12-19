import styled from "styled-components";

export const SkeletonCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image content";
  column-gap: 2.4rem;
  padding: 1.4rem;
  border-radius: 0.8rem;
  background-color: var(--gray-1);
  position: relative;
  overflow: hidden;

  .skeleton {
    background: linear-gradient(
      90deg,
      var(--gray-2) 25%,
      var(--gray-2) 50%,
      var(--gray-2) 75%
    );
    background-size: 200% 100%;
    animation: pulse 1.8s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "image"
      "content";
  }
`;

export const SkeletonImage = styled.div`
  width: 11.2rem;
  height: 11.2rem;
  grid-area: image;
  border-radius: 50%;
`;

export const SkeletonContent = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "demonstrator"
    "description"
    "address"
    "button";
  row-gap: 1rem;
`;

export const SkeletonText = styled.div`
  height: 1.6rem;
  width: ${({ width }) => width || "100%"};
  border-radius: 0.4rem;

  &.title {
    height: 2.4rem;
    width: 80%;
    margin-bottom: 0.8rem;
  }

  &.description {
    height: 1.6rem;
    width: 90%;
  }

  &.address {
    height: 1.6rem;
    width: 60%;
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
  flex-shrink: 0;

  &:not(:last-child) {
    margin-right: 0.8rem;
  }
`;

export const DemonstratorGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  grid-area: demonstrator;
  justify-content: flex-start;
  align-items: center;
`;
