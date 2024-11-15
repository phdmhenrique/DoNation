import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 100%;
  max-height: 9.1rem;
  padding: 0 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ContainerReturnPage = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: var(--primary);
  }
`;

export const ReturnPageMessage = styled.span`
  font-size: var(--font__20);
  color: var(--primary);
  font-weight: 700;
`;

export const ContainerCreateGroup = styled.div`
  width: fit-content;
`;

export const ButtonCreateOrEditGroup = styled.button`
  height: 4.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  background-color: var(--primary);
  color: var(--white);
  border: 0.1rem solid var(--primary);
  padding: 0.8rem 1.2rem;
  font-size: var(--font__16);
  font-weight: 700;
  border-radius: 5rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: var(--white);
    color: var(--primary);

    & svg {
      fill: var(--primary);
    }
  }

  & svg {
    width: 2rem;
    height: 2rem;
    fill: var(--white);
    transition: 0.3s ease;
  }
`;

export const LinkCreateGroup = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--white);
  gap: 1rem;

  &:hover {
    color: var(--primary);
  }
`;
