import {
  Rightside__OtherAccess__or,
  Rightside__OtherAccess__span,
} from "./OtherAccess.js";

import ButtonAccess from "../../ButtonAccess/ButtonAccess.jsx";

export default function OtherAccess() {
  return (
    <>
      <Rightside__OtherAccess__or className="rightside__other-access__or">
        or
      </Rightside__OtherAccess__or>
      <Rightside__OtherAccess__span>Access with</Rightside__OtherAccess__span>

      <ButtonAccess icon="google" text="Access with Google" />
      <ButtonAccess icon="facebook" text="Access with Facebook" />
      <ButtonAccess icon="x" text="Access with X" />
    </>
  );
}
