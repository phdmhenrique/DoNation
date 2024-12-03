import { ComunityUsername } from "../../Pages/GroupDetails/GroupDetails.js";

const GroupTitleAndUsername = ({ title, username }) => {
  return (
    <ComunityUsername>
      <p>{title || "Nome Da Comunidade"}</p>
      <p>@{username || "nomedecomunidade"}</p>
    </ComunityUsername>
  );
};

export default GroupTitleAndUsername;
