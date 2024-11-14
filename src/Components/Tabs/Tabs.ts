import styled from "styled-components";

interface TabProps {
  $active: boolean;
}

export const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background-color: var(--gray-2);
`;

export const Container = styled.nav`
  width: 100%;
  min-height: 9.9rem;
  margin-top: 2.4rem;
  padding: 0 1.4rem;
`;

export const TabsContainer = styled.header`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.2rem;

  padding: 0.8rem;
  background-color: var(--gray-1);
  border: 0.2rem solid var(--gray-2);
  border-radius: 0.4rem;
`;

export const TabList = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 2rem;
  flex-wrap: wrap;
  cursor: pointer;
`;

export const Tab = styled.button<TabProps>`
  min-width: 15.1rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: var(--font__16);
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;

  border-bottom: ${(props) =>
    props.$active ? ".3rem solid var(--primary)" : ".3rem solid transparent"};
  color: ${(props) => (props.$active ? "var(--primary)" : "var(--gray-3)")};

  transition: all 0.2s;

  & path,
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => (props.$active ? "var(--primary)" : "var(--gray-3)")};
  }
`;

export const TabContent = styled.section`
  margin-top: 1.2rem;
  padding-bottom: 1.2rem;
`;