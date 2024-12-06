import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: var(--font__14);
  color: var(--gray-3);
`;

const NoDataMessage = ({ message }) => {
  return <MessageContainer>{message}</MessageContainer>;
};

export default NoDataMessage;
