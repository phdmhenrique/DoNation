import { useNavigate } from 'react-router-dom';
import { JoinButton } from "../CardGroup/CardGroup.js";

const ViewGroupButton = ({ groupId }) => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate(`/home/group/${groupId}`);
  };

  return (
    <JoinButton onClick={handleViewGroup}>
      View Group
    </JoinButton>
  );
};

export default ViewGroupButton;
