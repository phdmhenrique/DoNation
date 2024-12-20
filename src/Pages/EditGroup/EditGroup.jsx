import { useEffect, useState } from "react";
import { Container } from "../../Components/Content/Content";
import { EditGroupProvider } from "../../Contexts/EditGroupContext";
import { useParams } from "react-router-dom";
import { apiGroups } from "../../api/axiosConfig";
import HeaderToEditGroup from "./HeaderToEditGroup.jsx";

export default function EditGroup() {
  const [groupData, setGroupData] = useState(null);
  const { groupName } = useParams();

  useEffect(() => {
    document.title = "DoNation - Editar Grupo";
    const fetchGroupData = async () => {
      try {
        const response = await apiGroups.listDetailsForGroup(groupName);
        setGroupData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do grupo", error);
      }
    };
    fetchGroupData();
  }, [groupName]);

  return (
    <Container>
      <EditGroupProvider>
        {groupData && (
          <HeaderToEditGroup
            isEditable={true}
            initialData={groupData}
            groupName={groupName}
          />
        )}
      </EditGroupProvider>
    </Container>
  );
}

