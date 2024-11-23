import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerEditable = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem 0;
  gap: 1.2rem;

  .add-bio-about {
    display: flex;
    flex-direction: column;
    padding: 0 2rem 3.7rem;
    border-bottom: 1px solid var(--gray-1);
    gap: 0.8rem;

    & label {
      font-size: var(--font__20);
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 0.4rem;
    }

    & .textarea-wrapper {
      width: 100%;
      gap: 0.4rem;
      position: relative;

      & textarea {
        background-color: var(--gray-1);
        width: 100%;
        min-height: 10rem;
        max-height: 15rem;
        padding: 1rem;
        border-radius: 0.4rem;
        border: 0.1rem solid var(--gray-7);
        resize: none;
      }

      & .char-counter {
        position: absolute;
        justify-self: end;
        font-size: var(--font__12);
        color: var(--gray-7);
        padding-bottom: 0.4rem;
        right: 0.5rem;
        bottom: 0.5rem;
      }
    }

    & button {
      width: 100%;
      max-width: 11.4rem;
      align-self: end;
      padding: 0.8rem 1.2rem;
      background-color: var(--primary);
      color: var(--white);
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: var(--font__16);
    }
  }

  .groupname-address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 3.2rem 2rem 6.7rem;
    border-bottom: 1px solid var(--gray-1);

    & .register-group-address {
      width: 100%;
      max-width: 30rem;
      display: flex;
      flex-direction: column;
      gap: 3.2rem;

      & label {
        color: var(--primary);
        font-weight: 700;
        font-size: var(--font__20);
      }

      & input {
        border-radius: 0.4rem;
        padding: 1.4rem;
        border: 1px solid var(--gray-2);
      }

      & .field-address {
        display: flex;
        align-items: center;
        border-radius: 0.4rem;
        border: 1px solid var(--gray-2);
        position: relative;

        & svg {
          width: 1.7rem;
          height: 1.7rem;
          margin-left: 1.4rem;
          position: absolute;
        }

        & input {
          padding: 1.4rem 1.4rem 1.4rem 4.4rem;
          width: 100%;
          border: none;
        }
      }
    }
  }

  .interest-groups {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3.7rem 2rem;

    & .register-interest-groups {
      width: 100%;
      gap: 3.5rem;
      display: flex;
      flex-direction: column;

      & span {
        font-size: var(--font__20);
        color: var(--primary);
        font-weight: 700;
      }

      & .container-interests-groups {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .sendInfosOfGroup {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem 4rem 2rem;
  }

`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;

  .image-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  .image-preview {
    width: 100%;
    cursor: pointer;
    object-fit: none;
    object-position: center;
    transition: object-fit 0.3s ease-in-out; /* Transição suave */
    z-index: 1;
  }

  .image-preview.selected {
    object-fit: cover;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    right: 0;
    top: 1rem;
  }
`;