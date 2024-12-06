import { Link } from 'react-router-dom';
import {
  Container,
  ContainerReturnPage,
  ContainerCreateGroup,
  ReturnPageMessage,
  ButtonCreateOrEditGroup,
} from "./CreateGroup.js";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

export default function CreateGroup() {
  return (
    <Container>
      <ContainerReturnPage>
        <Link to="/">
          <FaArrowLeftLong />
        </Link>
        <ReturnPageMessage>Groups</ReturnPageMessage>
      </ContainerReturnPage>

      <ContainerCreateGroup>
        <ButtonCreateOrEditGroup>
          <AiFillEdit /> Create a New Group
        </ButtonCreateOrEditGroup>
      </ContainerCreateGroup>
    </Container>
  );
}
