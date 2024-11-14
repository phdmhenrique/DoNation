import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  padding: 0 2rem;
`;

export const ModalContent = styled.div`
  width: 100%;
  max-width: 500px;
  background: var(--white);
  border-radius: .8rem;
  border-radius: .4rem;
  overflow: hidden;
`;

export const ModalContentInfos = styled.div`
padding: 1.8rem;
  font-size: var(--font__14);

& h2 {
  font-size: var(--font__16);
  color: var(--gray-5);
  font-weight: 700;
}

& p {
  font-weight: 500;
}

& span {
  font-weight: 700;
  color: var(--primary);
}

`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  background-color: var(--primary);
  padding: .8rem;
  position: relative;

  & svg, & path {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    fill: var(--white);
  }
`;

export const ModalContentButtons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  padding: 1.5rem;
  border-top: .1rem solid var(--gray-2);
  gap: 1.2rem;

  & button {
    width: 100%;
    max-width: 15.5rem;
    height: 100%;
    padding: .5rem;
  }

  @media (max-width: 392px) {
    justify-content: center;
  }
`;