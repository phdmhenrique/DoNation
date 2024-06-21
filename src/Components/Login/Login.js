import styled from 'styled-components';

export const Container = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
`;

export const TabHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
`;

export const TabHeaderItem = styled.div`
  width: 4rem;
  height: .3rem;
  border-radius: .5rem;
  background-color: var(--gray-2);
  cursor: pointer;

  &.active {
    background-color: var(--primary);
  }
`;

export const RightSideButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

