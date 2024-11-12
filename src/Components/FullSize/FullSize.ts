import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
        width: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--gray-7);
    }

    &::-webkit-scrollbar-track {
        background-color: var(--gray-1);
    }

`;
