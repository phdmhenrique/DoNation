import { useNavigate } from 'react-router-dom';
import { JoinButton } from "../CardGroup/CardGroup.js";

const ViewGroupButton = ({ groupName }) => {
  const navigate = useNavigate();

  const handleViewGroup = () => {
    navigate(`/home/group/${groupName}`);
  };

  return (
    <JoinButton onClick={handleViewGroup}>
      Visualizar Grupo
    </JoinButton>
  );
};

export default ViewGroupButton;
