import GroupHeader from "../GroupDetails/GroupHeader.jsx";
import { Container } from "../../Components/Content/Content";
import { GroupProvider } from "../../Contexts/GroupContext.jsx";

export default function CreateGroup() {
  return (
    <Container>
      <GroupProvider>
        <GroupHeader
          isEditable={true}
          onChange={(updatedGroupData) => {
            updatedGroupData;
          }}
        />
      </GroupProvider>
    </Container>
  );
}
