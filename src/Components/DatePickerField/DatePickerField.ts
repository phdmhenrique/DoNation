import styled from "styled-components";

interface DateTextProps {
  isValidDate: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-3);
  max-width: 32rem;
`;

export const DateField = styled.div`
  display: grid;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.4rem;
  border: 0.1rem solid var(--gray-2);
  background-color: var(--gray-1);
  cursor: pointer;
  width: 100%;
  transition: 0.2s ease-in-out;
`;

export const DateText = styled.div<DateTextProps>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  font-size: var(--font__16);
  font-weight: 500;
  color: ${(props) => (props.isValidDate ? "var(--tertiary)" : "var(--quinary)")};
`;

export const DateLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  font-size: var(--font__14);
  font-weight: 600;
  color: var(--gray-3);
  margin-bottom: 0.5rem;
`;

// Estilos para ocultar o input gerado pelo MUI
export const StyledInput = styled.div`
  height: 0;

  .MuiInputBase-root {
    display: none;
  }
`;