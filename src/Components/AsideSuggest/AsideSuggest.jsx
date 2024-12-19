import { useEffect, useState } from "react";
import {
  Container,
  Suggest,
  SuggestContainer,
  UserPhoto,
  NameUser,
  SuggestTitle,
} from "../AsideSuggest/AsideSuggest.js";

import SearchInput from "../SearchInput/SearchInput.jsx";

// API
import { apiUser, getUserImageUrl } from "../../api/axiosConfig.js";

// Imagem Fallback
import DefaultLandscape from "../../Assets/default-cover.jpg";
import DefaultAvatar from "../../Assets/default-avatar.png";
import SkeletonAsideSuggest from "../Skeletons/SkeletonAsideSuggest/SkeletonAsideSuggest.jsx";

function AsideSuggest() {
  const [suggestionsOfUsers, setSuggestionsOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetAdvices = async () => {
    try {
      const response = await apiUser.advice();
      setSuggestionsOfUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAdvices();
  }, []);

  return (
    <Container>
      <SearchInput />
      <SuggestTitle>
        <span>Sugestões</span>
        <button>Ver tudo</button>
      </SuggestTitle>

      {loading ? (
        <>
          <SkeletonAsideSuggest />
          <SkeletonAsideSuggest />
          <SkeletonAsideSuggest />
          <SkeletonAsideSuggest />
        </>
      ) : suggestionsOfUsers.length > 0 ? (
        <Suggest>
          {suggestionsOfUsers.map((suggestion) => {
            const userImageUrl = getUserImageUrl(suggestion.userImage);
            const landscapeImageUrl = getUserImageUrl(
              suggestion.landscapeImage
            );

            return (
              <SuggestContainer key={suggestion.username}>
                <img
                  src={landscapeImageUrl || DefaultLandscape}
                  alt="Landscape"
                />
                <UserPhoto>
                  <img src={userImageUrl || DefaultAvatar} alt="User" />
                </UserPhoto>
                <NameUser>
                  <span>{suggestion.name}</span>
                  <span>{suggestion.username}</span>
                </NameUser>
              </SuggestContainer>
            );
          })}
        </Suggest>
      ) : (
        <p>Nenhuma sugestão encontrada.</p>
      )}
    </Container>
  );
}

export default AsideSuggest;
