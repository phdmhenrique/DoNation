import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  border-top: 0.1rem solid var(--gray-2);
  background: var(--gray-1);
`;

export const SkeletonBlock = styled.div`
  background: linear-gradient(90deg, var(--gray-2), var(--gray-2), var(--gray-2));
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 0.4rem;
`;

export const SkeletonInfoUser = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & .avatar {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }

  & .text {
    width: 100%;
    & .line {
      height: 1.2rem;
      margin-bottom: 0.5rem;

      &:first-child {
        width: 50%;
      }
      &:last-child {
        width: 30%;
      }
    }
  }
`;

export const SkeletonBanner = styled(SkeletonBlock)`
  width: 100%;
  height: 25rem;
`;

export const SkeletonTitle = styled(SkeletonBlock)`
  width: 40%;
  height: 1.5rem;
`;

export const SkeletonTags = styled.div`
  display: flex;
  gap: 0.5rem;

  & .tag {
    width: 3rem;
    height: 1.2rem;
    border-radius: 0.5rem;
  }
`;