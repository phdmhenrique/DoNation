import { useEffect, useState } from "react";
import { Container } from "../../Components/Content/Content";
import { ProfileProvider } from "../../Contexts/ProfileContext.jsx";
import useProfileForm from "../../hooks/useProfileForm.js"; // Crie um hook para gerenciar o formulário de perfil
import HeaderToEditProfile from "./HeaderToEditProfile.jsx";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import { apiUser } from "../../api/axiosConfig.js";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    document.title = "DoNation - Meu Perfil";
  }, []);

  useEffect(() => {
    document.title = "DoNation - Editar Perfil";
    const fetchProfileData = async () => {
      try {
        const response = await apiUser.getProfileDetails(user.username);
        setProfileData(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil", error);
      }
    };
    fetchProfileData();
  }, [user.username]);

  const { handleInputChange, handleImageChange } = useProfileForm(profileData);

  return (
    <Container>
      <ProfileProvider>
        {profileData && (
          <HeaderToEditProfile
            isEditable={true}
            initialData={profileData}
            onChange={handleInputChange}
            onImageChange={handleImageChange}
          />
        )}
      </ProfileProvider>
    </Container>
  );
}
