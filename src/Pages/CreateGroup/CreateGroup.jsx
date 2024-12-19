import { useEffect } from "react";
import GroupHeader from "./HeaderToCreateGroup.jsx";
import { Container } from "../../Components/Content/Content";
import { GroupProvider } from "../../Contexts/GroupContext.jsx";
import useGroupForm from "../../hooks/useGroupForm.js";

export default function CreateGroup() {
  useEffect(() => {
    document.title = "DoNation - Criar Grupo";
  }, []);

  const { groupData, handleInputChange, handleImageChange } = useGroupForm({
    comunityTitle: "",
    comunityUsername: "",
    comunityAddress: "",
    bioAboutText: "",
    comunityBanner: null,
    comunityImage: null,
    comunityInterests: [],
  });
  
  return (
    <Container>
      <GroupProvider>
        <GroupHeader
          isEditable={true}
          groupData={groupData}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
        />
      </GroupProvider>
    </Container>
  );
}
