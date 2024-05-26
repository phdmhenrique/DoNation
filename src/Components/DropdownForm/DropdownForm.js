import styled, { css } from "styled-components";

export const Select = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  padding: 0 0.5rem;
  border-radius: 0.4rem;
  border: 0.1rem solid var(--gray-2);
  background-color: var(--gray-1);
  transition: 0.2s ease-in-out;

  color: var(--primary);
  font-size: var(--font__16);
  font-weight: 500;
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  max-height: 17rem;
  width: 100%;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
  gap: 0.2rem;

  position: absolute;
  top: 100%;
  left: 0;
  overflow-y: auto;

  font-size: var(--font__16);
  background-color: var(--white);
  border: .1rem solid var(--gray-2);
  border-top: none;
  border-radius: 0 0 0.4rem 0.4rem;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, 0.1);
  z-index: 1;

  /* Estilos para o scrollbar */
  &::-webkit-scrollbar {
    width: .6rem;
  }

  &::-webkit-scrollbar-track {
    width: .7rem;
    background: var(--white);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: .5rem;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--gray-4);
  }
`;

export const Option = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ active }) =>
    active ? "var(--primary)" : "var(--gray-2)"};
  color: ${({ active }) => (active ? "var(--white)" : "inherit")};

  &:hover {
    color: ${({ active }) => (active ? 'var(--black)' : 'var(--primary)' )};
  }
`;

export const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: ${({ isOpen }) => (isOpen ? "none" : "0.5rem solid var(--primary)")};
  border-bottom: ${({ isOpen }) => (isOpen ? "0.5rem solid var(--primary)" : "none")};
  transition: transform 0.2s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;