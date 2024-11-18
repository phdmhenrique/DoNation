import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";

import {
  Container,
  ContainerReturnPage,
  ContainerCreateGroup,
  ReturnPageMessage,
  ButtonCreateOrEditGroup,
  LinkCreateGroup,
} from "./NavCreateGroup.js";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

export default function CreateGroup() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Container>
      <ContainerReturnPage>
        <Link onClick={handleLogout}>
          <FaArrowLeftLong />
        </Link>
        <ReturnPageMessage>Grupos</ReturnPageMessage>
      </ContainerReturnPage>

      <ContainerCreateGroup>
        <ButtonCreateOrEditGroup>
          <LinkCreateGroup to="create-group">
            <AiFillEdit /> Criar Grupo
          </LinkCreateGroup>
        </ButtonCreateOrEditGroup>
      </ContainerCreateGroup>
    </Container>
  );
}