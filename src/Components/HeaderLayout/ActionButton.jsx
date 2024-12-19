import Button from "../Button/Button.jsx";

const ActionButton = ({ onSave, isSubmitting, isFormValid }) => (
  <div className="sendInfosOfGroup">
    <Button
      onClick={onSave}
      addStatusClass={isFormValid ? "active" : "disabled"}
      isDisabled={isSubmitting}
    >
      Salvar
    </Button>
  </div>
);

export default ActionButton;
