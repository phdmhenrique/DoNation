import styled from "styled-components";

export const Container = styled.div`
  font-size: var(--font__16);
  padding: 2rem 1.6rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const PreviewSection = styled.div`
  margin-bottom: 2rem;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const DonationCard = styled.div`
  background: white;
  border-radius: 0.3rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 0 1.8rem;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1rem;

  & .user__image-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const UserImage = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--gray-0);

  h3 {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.2rem;
  }
`;

export const PostDate = styled.div`
  color: var(--gray-7);
  font-size: 1.2rem;
`;

export const DonationTitle = styled.h2`
  margin: 0;
  padding: 1rem 0;
  font-size: 1.6rem;
  color: var(--gray-0);
`;

export const DonationImage = styled.div`
  height: 23.7rem;
  background: var(--gray-1);
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export const ImageUploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  color: var(--gray-5);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const DonationFooter = styled.div`
  padding: 1rem 0;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const Tag = styled.span`
  background: ${(props) =>
    props.selected ? "var(--primary)" : "var(--white)"};
  color: ${(props) => (props.selected ? "var(--white)" : "var(--primary)")};
  border: 0.1rem solid
    ${(props) => (props.selected ? "var(--primary)" : "var(--primary)")};
  padding: 0.25rem 0.75rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.selected ? "var(--quinary)" : "var(--primary)"};
    color: ${(props) => (props.selected ? "var(--white)" : "var(--white)")};
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 0.1rem solid var(--gray-2);

  & span {
    border: 0.1rem solid var(--primary);
    display: flex;
    align-items: center;
    padding: 0.5rem;
    & svg {
      font-size: 2.4rem;
    }
  }

  button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: var(--quinary);
    }
  }
`;

export const FormSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 437px) {
    padding: 2rem 1rem;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const TimeSelector = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DaySelector = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 437px) {
    flex-wrap: wrap;
  }

  button {
    min-width: 4.75rem;
    max-width: 4.75rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }

    &:hover {
      border-color: var(--primary);
    }
  }
`;

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const TimeSlot = styled.div`
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const TagSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 25rem;
  overflow-y: auto;
  padding: 1rem;
  background: var(--gray-1);
  border-radius: 0.4rem;
  scroll-behavior: smooth;
  border-bottom: 0.2rem solid var(--gray-2);

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: var(--gray-2);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--gray-5);
  }
`;

export const StyledForm = styled.form``;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.6rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 0.1rem solid #ddd;
  border-radius: 4px;
  font-size: 1.6rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.6rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const StyledButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: var(--quinary);
  }
`;

export const AvailabilitySection = styled.div`
  margin-top: 1rem;
`;

export const Modal = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;
