import { JoinButton } from "../CardGroup/CardGroup.js";

const JoinCancelButton = ({
  groupName,
  openJoinModal,
  handleCancelRequest,
  sentRequests = [],
  hoveringGroupName,
  setHoveringGroupName,
}) => {
  const isRequested = sentRequests.includes(groupName);

  return (
    <JoinButton
      onClick={() => {
        if (isRequested) {
          handleCancelRequest(groupName);
        } else {
          openJoinModal(groupName);
        }
      }}
      onMouseEnter={() => setHoveringGroupName(groupName)}
      onMouseLeave={() => setHoveringGroupName(null)}
      $isRequested={isRequested}
      $hoveringgroupName={hoveringGroupName}
    >
      {isRequested
        ? hoveringGroupName === groupName
          ? "Cancelar Solicitação"
          : "Solicitação Enviada"
        : "Se Juntar"}
    </JoinButton>
  );
};

export default JoinCancelButton;
