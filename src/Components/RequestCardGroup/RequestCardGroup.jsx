import { memo } from "react";
import {
  Container,
  Card,
  ImageCard,
  ContentCard,
  Title,
  Demonstrator,
  Description,
  Address,
} from "../CardGroup/CardGroup.js";

// Components
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";

// eslint-disable-next-line react/display-name
const RequestCardGroup = memo(
  ({
    groups,
    ButtonComponent,
    openJoinModal,
    hoveringGroupName,
    setHoveringGroupName,
    noDataMessage,
  }) => {
    return (
      <Container>
        {groups.length === 0 ? (
          <NoDataMessage message={noDataMessage} />
        ) : (
          groups.map((request, index) => {
            const { group } = request;

            return (
              <Card key={index}>
                <ImageCard>
                  <img src={group.imageUrl || "default-image-url"} alt={group.name} />
                </ImageCard>
                <ContentCard>
                  <Title>{group.name}</Title>
                  <Demonstrator>
                    <span>{group.username}</span> {/* Exibindo o nome do usuário */}
                  </Demonstrator>
                  <Description>{group.description}</Description>
                  <Address>
                    <LocationIcon />
                    {group.address}
                  </Address>
                  <ButtonComponent
                    groupName={group.groupname}
                    request={request}  // Passando a requisição para o botão
                    openJoinModal={openJoinModal}
                    hoveringGroupName={hoveringGroupName}
                    setHoveringGroupName={setHoveringGroupName}
                  />
                </ContentCard>
              </Card>
            );
          })
        )}
      </Container>
    );
  }
);

export default RequestCardGroup;
