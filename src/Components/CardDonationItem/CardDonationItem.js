import styled from "styled-components";
import { InterestsAndDetails } from "../CardContributions/CardContributions.js";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem 1.4rem;
  border-top: 0.1rem solid var(--gray-2);
`;

export const CardInfoUser = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;

  img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const CardInfoUserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const Usernames = styled.div`
  flex-direction: column;
  line-height: 1.4rem;
  color: var(--gray-0);
  font-weight: 700;

  & span {
    font-size: var(--font__16);
  }

  & p {
    font-size: var(--font__12);
  }
`;

export const ContributionDate = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  color: var(--gray-7);
`;

export const ContributionServiceTitle = styled.h1`
  font-size: var(--font__16);
  font-weight: 700;
  color: var(--gray-5);
`;

export const ContributionService = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;

  .contribution__service-banner {
    width: 100%;
    height: 25rem;
    overflow: hidden;
    position: absolute;
    opacity: 1;
    transition: 0.2s ease-in-out all;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.fade {
      opacity: 0;
      z-index: -1;
    }
  }

  & .alternative-content {
    min-height: 25rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    border: 0.2rem solid var(--primary);
    border-radius: 0.4rem;
    opacity: 0;
    transition: 0.2s ease-in-out all;

    &.show {
      opacity: 1;
    }

    @media (max-width: 620px) {
      grid-template-columns: 1fr;
      grid-template-rows: 15rem auto;
    }
  }

  & .description-contribution {
    width: 100%;
    height: 100%;
    padding: 1rem;
    font-size: var(--font__14);
    color: var(--gray-5);
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 4rem;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--gray-2);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--gray-7);
    }
  }

  & .container-availability__contribution {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary);
  }

  & .availability-contribution {
    max-width: 24.7rem;
    height: 100%;
    padding: 1rem;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.4rem;
  }

  & .days {
    width: 100%;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
  }

  & .day {
    width: 2.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2rem;
    border-radius: 0.5rem;
    background-color: var(--white);
    color: var(--primary);
    font-size: var(--font__12);
    opacity: 0.75;
    cursor: pointer;
    user-select: none;
  }

  & .day.active {
    opacity: 1;
    font-weight: bold;
  }

  & .availability-hours__title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--white);
    color: var(--primary);
    border-radius: 0.5rem;
    font-weight: bold;
  }

  & .availability-hours {
    margin: 0 auto;
    display: grid;
    grid-auto-flow: column dense;
    grid-template-rows: repeat(6, 2rem);
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    text-align-last: justify;

    &::after {
      content: "";
      width: 0.2rem;
      height: 100%;
      position: absolute;
      top: 0;
      left: calc(50% - 0.1rem);
      background-color: var(--white);
      z-index: 1;
    }
  }

  .hour {
    display: grid;
    margin: 0 0.4rem;
    font-size: var(--font__16);
    font-weight: 500;
    cursor: pointer;
    opacity: 0.5;
    user-select: none;

    &.available {
      opacity: 1;
      color: var(--white);
      border-radius: 0.3rem;
    }
  }

  & .availability-address {
    font-size: var(--font__12);
    font-weight: 700;
    line-height: 1.2rem;
    border-top: 0.2rem solid var(--white);
    padding-top: 0.8rem;
  }
`;

export const InterestsAndDetailsStyled = styled(InterestsAndDetails)`
  flex-wrap: wrap;
  gap: 1.2rem;
  border-top: 0.1rem solid var(--gray-2);
`;
