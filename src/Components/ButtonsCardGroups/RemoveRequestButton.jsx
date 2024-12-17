import { JoinButton } from "../CardGroup/CardGroup.js";

const RemoveRequestButton = ({ groupName, handleCancelRequest }) => {
  return (
    <JoinButton
      onClick={() => {
        handleCancelRequest(groupName);
      }}
    >
      Cancelar Solicitação
    </JoinButton>
  );
};

export default RemoveRequestButton;
