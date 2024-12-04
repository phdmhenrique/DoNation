import Button from "../../Components/Button/Button.jsx";

const GroupActions = ({ onSave, isSubmitting, isFormValid }) => (
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

export default GroupActions;
