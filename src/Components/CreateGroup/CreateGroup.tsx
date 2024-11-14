import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.tsx";

import {
  Container,
  ContainerReturnPage,
  ContainerCreateGroup,
  ReturnPageMessage,
  ButtonCreateOrEditGroup,
} from "./CreateGroup.ts";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

export default function CreateGroup() {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  }

  return (
    <Container>
      <ContainerReturnPage>
        <Link to="" onClick={handleLogout}>
          <FaArrowLeftLong />
        </Link>
        <ReturnPageMessage>Grupos</ReturnPageMessage>
      </ContainerReturnPage>

      <ContainerCreateGroup>
        <ButtonCreateOrEditGroup>
          <AiFillEdit /> Criar Grupo
        </ButtonCreateOrEditGroup>
      </ContainerCreateGroup>
    </Container>
  );
}
