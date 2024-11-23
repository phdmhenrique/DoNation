import { RightSideContainer, RightsideContent } from "./RightSide.js";

function RightSide({ children }) {
  return (
    <RightSideContainer className="rightside">
      <RightsideContent className="rightside-container">
        { children }       
      </RightsideContent>
    </RightSideContainer>
  );
}

export default RightSide;
