import styled from "styled-components";
import { ButtonStyled } from "../Button/Button.js";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.6rem;
`;

export const Card = styled.div`
  width: 100%;
  background-color: var(--gray-1);
  min-height: max-content;
  border-radius: 0.4rem;

  & img {
    width: 100%;
    height: 8.7rem;
    object-fit: cover;
    object-position: center;
    padding: 0.8rem;
  }
`;

export const TitleAndDateInfos = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  border-bottom: 0.1rem solid var(--gray-2);

  & h1 {
    font-size: var(--font__16);
    font-weight: 700;
    color: var(--gray-0);
  }
`;
export const DateInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 0.8rem;

  & p {
    font-size: var(--font__14);
    color: var(--gray-7);
    font-weight: 400;
  }
`;

export const InterestsAndDetails = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 2rem 0.8rem 0.8rem;

  & div {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const Interests = styled.div`
  gap: 0.4rem;
  flex-wrap: wrap;
`;

export const Details = styled.div`
  gap: 1.2rem;
  flex-wrap: wrap;

  & div {
    width: max-content;
    height: 3.7rem;
    display: flex;
    align-items: center;
    border: 0.1rem solid var(--primary);
    border-radius: 0.5rem;
    color: var(--black);
    font-size: var(--font__14);
    font-weight: 400;
    overflow: hidden;
    background-color: var(--white);

    & span {
      padding: 0.8rem; 
    }

    & p {
      width: 4.6rem;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary);
      padding: 0.8rem;
      border-radius: 0.5rem;
      font-size: var(--font__16);
      color: var(--white);
      font-weight: 700;

      & svg {
        font-size: 2.8rem; 
      }
    }
  }

  & button {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border: 0.1rem solid var(--primary);
    background-color: var(--white);
    padding: 0.8rem;
    border-radius: 0.5rem;
    font-weight: 700;
    color: var(--black);
    cursor: pointer;
    transition: 0.1s ease all;

    & svg,
    path {
      width: 2rem;
      height: 2rem;
      fill: var(--primary);
      transition: 0.1s ease all;
    }
  }

  & button:hover {
    background-color: var(--primary);
    color: var(--white);

    & svg,
    path {
      fill: var(--white);
    }
  }
`;

export const ButtonStyledInterests = styled(ButtonStyled)`
  width: max-content;
  height: 100%;
  padding: 0.6rem 0.4rem;
`;
