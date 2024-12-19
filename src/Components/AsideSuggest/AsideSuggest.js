import styled from "styled-components";

export const Container = styled.aside`
  height: 100%;
  padding: 0 0 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & p {
    font-size: 1.4rem;
    color: var(--gray-3);
  }

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 1216px) {
    display: none;
  }
`;

export const SuggestTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font__16);
  margin: 3.2rem 0 0.4rem 0;

  & span {
    font-weight: bold;
  }

  & button {
    background: none;
    border: none;
    color: var(--gray-4);
    cursor: pointer;
    font-size: var(--font__14);
  }
`;

export const Suggest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

export const SuggestContainer = styled.div`
  width: 100%;
  height: 12rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
  border-radius: 0.4rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const UserPhoto = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  position: absolute;
  top: 0.5rem;
  left: 0.7rem;
  z-index: 2;
  overflow: hidden;
  border: 0.2rem solid var(--white-smoke);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
`;

export const NameUser = styled.div`
  width: auto;
  height: 4.2rem;
  border-radius: 0.4rem;
  background-color: var(--primary);
  position: absolute;
  top: 7rem;
  left: 0.7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  padding: 0.4rem 1rem;

  & span {
    color: var(--white);
    font-size: var(--font__14);
    font-weight: bold;
  }

  & span + span {
    font-weight: 400;
    opacity: 0.8;
  }
`;
