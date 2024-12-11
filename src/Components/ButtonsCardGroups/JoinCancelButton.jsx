import { JoinButton } from "../CardGroup/CardGroup.js";

const JoinCancelButton = ({
  groupName,
  request,
  openJoinModal,
  handleCancelRequest,
  hoveringGroupName,
  setHoveringGroupName,
}) => {
  return (
    <JoinButton
      onClick={() => {
        if (request) {
          handleCancelRequest(groupName);
        } else {
          openJoinModal(groupName);
        }
      }}
      onMouseEnter={() => setHoveringGroupName(groupName)}
      onMouseLeave={() => setHoveringGroupName(null)}
      $isRequested={request}
      $hoveringgroupName={hoveringGroupName}
    >
      {request
        ? hoveringGroupName === groupName
          ? "Cancelar Solicitação"
          : "Solicitação Enviada"
        : "Se Juntar"}
    </JoinButton>
  );
};

export default JoinCancelButton;
