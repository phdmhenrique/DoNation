import { ButtonStyled } from './Button.js';

function Button({ children, addStatusClass, onClick }) {
    const buttonClass = `button ${addStatusClass}`;

    return (
        <ButtonStyled
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </ButtonStyled>
    );
};

export default Button;
