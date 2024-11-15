import { useState } from "react";
import HeaderGroup from "../GroupDetails/HeaderGroup.jsx";
import { Container } from "../../Components/Content/Content";

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groupUsername, setGroupUsername] = useState("");
  const [groupAddress, setGroupAddress] = useState("");

  return (
    <Container>
      <HeaderGroup
        isEditMode={true}
        groupName={groupName}
        setGroupName={setGroupName}
        groupUsername={groupUsername}
        setGroupUsername={setGroupUsername}
        groupAddress={groupAddress}
        setGroupAddress={setGroupAddress}
      />
      <form>
        <label>Bio/Sobre:</label>
        <textarea placeholder="Escrever sobre o grupo..." maxLength={888}></textarea>
        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}
