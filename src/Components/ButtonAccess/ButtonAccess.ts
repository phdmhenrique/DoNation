import styled from "styled-components";

export const ButtonSocialMedia = styled.div`
  width: 20.3rem;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0 1rem;
  outline: none;
  border: 0.1rem solid var(--gray-2);
  border-radius: 0.5rem;

  color: var(--gray-3);
  font-size: var(--font__14);
  font-weight: 500;

  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    font-size: 1.42rem;
  }
`;
