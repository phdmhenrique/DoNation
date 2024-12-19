import { ComunityUsername } from "../../Pages/GroupDetails/GroupDetails.js";

const TitleAndUsername = ({ title, username, defaultTitle, defaultUsername }) => {
  return (
    <ComunityUsername>
      <p>{title || defaultTitle}</p>
      <p>@{username || defaultUsername}</p>
    </ComunityUsername>
  );
};

export default TitleAndUsername;
