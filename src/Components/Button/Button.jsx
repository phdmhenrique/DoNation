function Button({ children, addStatusClass, onClick, isDisabled }) {
  const buttonClass = `w-40 h-12 flex justify-center items-center select-none 
    rounded cursor-pointer font-bold transition duration-300 ease-in-out
    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white hover:text-primary'}
    ${addStatusClass === 'inactive' ? 'bg-white text-primary border border-primary' : 'bg-primary text-white border border-primary'}
  `;

  return (
    <button
      className={buttonClass}
      onClick={!isDisabled ? onClick : null}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default Button;
