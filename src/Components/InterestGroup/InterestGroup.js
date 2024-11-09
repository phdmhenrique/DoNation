import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem .4rem;
  
  & span {
    font-size: var(--font__16);
    color: var(--primary);
  }
  
  & div {
    display: flex;
    flex-wrap: wrap;
    gap: .8rem .4rem;
  }
`;

export const GroupButton = styled.button`
  background-color: ${props => props.selected ? 'var(--primary)' : 'var(--white)'};
  color: ${props => props.selected ? 'var(--white)' : 'var(--black)'};
  border: .1rem solid var(--primary);
  border-radius: .5rem;
  padding: 0 .8rem;
  transition: all .1s ease-in-out;

  cursor: pointer;
  font-size: var(--font__14);

  &:hover {
    background-color: var(--primary);
    color: var(--white);
  }
`;