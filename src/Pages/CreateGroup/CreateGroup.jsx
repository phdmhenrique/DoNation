import GroupHeader from "../GroupDetails/GroupHeader.jsx";
import { Container } from "../../Components/Content/Content";

export default function CreateGroup() {

  return (
    <Container>
      <GroupHeader isEditable={true} />
    </Container>
  );
}
