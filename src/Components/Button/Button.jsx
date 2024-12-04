import { ButtonStyled } from './Button.js';

function Button({ children, addStatusClass, onClick, isDisabled }) {
    const buttonClass = `button ${addStatusClass} ${isDisabled ? 'disabled' : ''}`;

    return (
        <ButtonStyled
            className={buttonClass}
            onClick={!isDisabled ? onClick : null}
            disabled={isDisabled}
        >
            {children}
        </ButtonStyled>
    );
};

export default Button;
