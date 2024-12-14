import { JoinButton } from "../CardGroup/CardGroup.js";

const JoinCancelButton = ({
  groupName,
  request,
  openJoinModal,
  handleCancelRequest,
  hoveringGroupName,
  setHoveringGroupName,
}) => {

  const isRequestSent = Boolean(request);

  return (
    <JoinButton
      onClick={() => {
        if (isRequestSent) {
          handleCancelRequest(groupName);
        } else {
          openJoinModal(groupName);
        }
      }}
      onMouseEnter={() => setHoveringGroupName(groupName)}
      onMouseLeave={() => setHoveringGroupName(null)}
      $isRequested={isRequestSent}
      $hoveringgroupName={hoveringGroupName}
    >
      {isRequestSent
        ? hoveringGroupName === groupName
          ? "Cancelar Solicitação"
          : "Solicitação Enviada"
        : "Se Juntar"}
    </JoinButton>
  );
};

export default JoinCancelButton;
