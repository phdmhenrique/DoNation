import React, { ReactNode } from "react";
import { RightSideContainer, RightsideContent } from "./RightSide.ts";

interface RightSideProps {
  children: ReactNode;
}

function RightSide({ children }: RightSideProps) {
  return (
    <RightSideContainer className="rightside">
      <RightsideContent className="rightside-container">{children}</RightsideContent>
    </RightSideContainer>
  );
}

export default RightSide;
