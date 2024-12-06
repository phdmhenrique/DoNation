import { JoinButton } from "../CardGroup/CardGroup.js";

const JoinCancelButton = ({
  groupId,
  openJoinModal,
  handleCancelRequest,
  sentRequests,
  hoveringGroupId,
  setHoveringGroupId,
}) => {
  const isRequested = sentRequests.includes(groupId);

  return (
    <JoinButton
      onClick={() => {
        if (isRequested) {
          handleCancelRequest(groupId);
        } else {
          openJoinModal(groupId);
        }
      }}
      onMouseEnter={() => setHoveringGroupId(groupId)}
      onMouseLeave={() => setHoveringGroupId(null)}
      $isRequested={isRequested} // Usando prop transient com o prefixo $
      $hoveringGroupId={hoveringGroupId} // Usando prop transient com o prefixo $
    >
      {isRequested
        ? hoveringGroupId === groupId
          ? "Cancel Request"
          : "Request Sent"
        : "Join"}
    </JoinButton>
  );
};

export default JoinCancelButton;
