import { JoinButton } from "../CardGroup/CardGroup.js";

const RemoveRequestButton = ({ groupId, groupName, openCancelModal }) => {
  return (
    <JoinButton onClick={() => openCancelModal(groupId, groupName)}>
      Cancel Request
    </JoinButton>
  );
};

export default RemoveRequestButton;
