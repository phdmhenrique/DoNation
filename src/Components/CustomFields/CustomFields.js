import styled from "styled-components";

export const Container = styled.div`
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .input-label {
    color: var(--gray-3);
    font-size: var(--font__14);
    font-weight: 500;
    word-wrap: break-word;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  border-radius: 0.4rem;
  border: 0.1rem solid var(--gray-2);
  background-color: var(--gray-1);
  transition: 0.2s ease-in-out;

  &:focus {
    outline: none;
    border: 0 solid none;
    border-radius: 0;
    border-bottom: 0.1rem solid var(--primary);
    background-color: var(--white);
  }
`;

export const StyledEyeIcon = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--gray-3);
  font-size: 1.6rem;

  &:hover {
    color: var(--gray-5);
  }
`;
