import { Container } from "@mui/material";
import { useEffect } from "react";
// import useProfileForm from "../../hooks/useProfileForm";
import {useAuth} from "../../Contexts/AuthContext";
import GroupHeader from "../../Components/GroupHeader/GroupHeader";

function Profile() {
  useEffect(() => {
    document.title = "DoNation - Meu Perfil";
  }, []);

  const { user } = useAuth();

  // const { profileData, handleInputChange, handleImageChange } = useProfileForm({
  //   profileName: "",
  //   profileUsername: "",
  //   profileAddress: "",
  //   descriptionBio: "",
  //   profileImage: null,
  //   profileLandscape: null,
  // });

  return (
    <Container>
      <span>Olá: {user.name}</span>
      <GroupHeader
          isEditable={true}
          // groupData={groupData}
          // onChange={handleInputChange}
          // onImageChange={handleImageChange}
          // onSave={handleSave}
        />
    </Container>
  );
}

export default Profile;
