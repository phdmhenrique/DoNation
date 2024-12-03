import Button from "../../Components/Button/Button.jsx";

const GroupActions = ({ onSave }) => (
  <div className="sendInfosOfGroup">
    <Button onClick={onSave}>Salvar</Button>
  </div>
);

export default GroupActions;
