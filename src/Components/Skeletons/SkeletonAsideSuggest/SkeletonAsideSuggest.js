import styled from "styled-components";

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 12rem;
  position: relative;
  border-radius: 0.4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--gray-2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .skeleton {
    padding: 1rem;
    background: linear-gradient(
      90deg,
      var(--gray-1) 25%,
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
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
`;

export const SkeletonUserPhoto = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  position: absolute;
  top: 0.5rem;
  left: 0.7rem;
  background-color: var(--gray-2);
`;

export const SkeletonNameUser = styled.div`
  position: absolute;
  top: 7rem;
  left: 0.7rem;
  width: 33rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  padding: 0.4rem 1rem;
`;

export const SkeletonText = styled.div`
  height: 1.6rem;
  width: ${({ width }) => width || "100%"};
  margin-bottom: 0.8rem;
  border-radius: 0.4rem;
  background-color: var(--gray-1);
`;
