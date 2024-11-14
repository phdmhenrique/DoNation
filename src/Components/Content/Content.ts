import styled from "styled-components";

export const Container = styled.section`
  width: auto;
  height: 100%;
  border: 0.1rem solid var(--gray-2);
  border-bottom: 0;
  border-top: none;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--gray-1);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-7);
  }
`;
