import styled from "styled-components";

export const ButtonStyled = styled.button`
    width: 15.4rem;
    height: 4.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    user-select: none;

    outline: 0;
    border: none;
    border-radius: .5rem;
    cursor: pointer;

    background-color: var(--primary);
    color: var(--white);
    border: .1rem solid var(--primary);

    font-size: var(--font__16);
    font-weight: 700;
    transition: .3s ease-in-out;

    &:not(.disabled):hover {
        background-color: var(--white);
        color: var(--primary);
        border: .1rem solid var(--primary);
    }

    &.inactive {
        background-color: var(--white);
        color: var(--primary);
        border: .1rem solid var(--primary);
    }

    &.disabled {
        cursor: not-allowed;
        opacity: .5;
    }
`;
