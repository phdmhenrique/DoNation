import styled, { css } from "styled-components";

export const Container = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem 1.6rem 0;
  gap: 1.5rem;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 738px) {
    display: none;
  }
`;

export const PhotoUserImage = styled.div`
  padding-left: 1.6rem; 
  display: flex;
  gap: 1rem;

  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 0.1rem solid var(--white-smoke);
    object-fit: cover;
  }

  & div {
    display: block;

    & p {
      font-size: var(--font__12);
    }
  }
`;

export const NavListLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  @media (max-width: 1315px) {
    align-items: center;
  }
`;

export const NavLink = styled.li`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0 1rem 1.6rem;
  font-size: var(--font__16);
  font-weight: 700;
  color: var(--gray-7);
  cursor: pointer;
  transition: all 0.1s ease-in;
  border-radius: 1rem;

  @media (max-width: 1315px) {
    font-size: 0;
    width: 100%;
    justify-content: center;
    align-items: center;

    & svg {
      width: 3rem;
      height: 3rem;
    }
  }

  & path {
    stroke: var(--gray-7);
  }

  &:hover {
    color: var(--gray-pure);
    background-color: var(--white-smoke);

    path {
      stroke: var(--gray-pure);
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: var(--gray-pure);
      background-color: var(--white-smoke);

      path {
        stroke: var(--gray-pure);
      }
    `}
`;
