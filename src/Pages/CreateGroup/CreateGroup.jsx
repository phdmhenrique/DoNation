import { useEffect } from "react";
import GroupHeader from "../../Components/GroupHeader/GroupHeader.jsx";
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

  const handleSave = () => {
    if (!groupData.comunityTitle || !groupData.comunityAddress) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    console.log("Dados válidos, salvando...", groupData);
  };
  
  return (
    <Container>
      <GroupProvider>
        <GroupHeader
          isEditable={true}
          groupData={groupData}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
          onSave={handleSave}
        />
      </GroupProvider>
    </Container>
  );
}
