import { JoinButton } from "../CardGroup/CardGroup.js";

const RemoveRequestButton = ({ groupName, openCancelModal }) => {
  return (
    <JoinButton onClick={() => openCancelModal(groupName)}>
      Cancelar Solicitação
    </JoinButton>
  );
};

export default RemoveRequestButton;
