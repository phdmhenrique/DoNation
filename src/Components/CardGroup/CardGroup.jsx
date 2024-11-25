import {
  ResultsAndFilters,
  Container,
  Card,
  ImageCard,
  ContentCard,
  Title,
  Demonstrator,
  PhotoUserUnit,
  // InfoNumberOfDonation,
  Description,
  Address,
  PhotoUsersFromGroup,
} from "./CardGroup.js";

import { getGroupImageUrl } from "../../api/axiosConfig.js";
import { getUserImageUrl } from "../../api/axiosConfig.js";

// Icons
import GroupIcon from "../../Icons/GroupIcon.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";

const CardGroup = ({
  groups,
  sentRequests,
  ButtonComponent,
  openJoinModal,
  handleCancelRequest,
  openCancelModal,
  hoveringGroupId,
  setHoveringGroupId,
  noDataMessage,
}) => {

  return (
    <Container>
      {groups.length === 0 ? (
        <NoDataMessage message={noDataMessage} />
      ) : (
        <>
          <ResultsAndFilters>
            Exibindo {groups.length} de {groups.length} resultados
          </ResultsAndFilters>
          {groups.map((group, index) => {
            const imageGroupUrl = getGroupImageUrl(group.groupImage);
            return (
              <Card key={index}>
                <ImageCard>
                  <img src={imageGroupUrl} alt={group.description} />
                </ImageCard>
                <ContentCard>
                  <Title>{group.name}</Title>
                  <Demonstrator>
                    <GroupIcon />
                    <PhotoUsersFromGroup>
                      {group.members.slice(0, 5).map((member, index) => {
                        const imageMemberUrl = getUserImageUrl(
                          member.userImage
                        );

                        return (
                          <div key={index}>
                            <img src={imageMemberUrl} alt={member.name} />
                          </div>
                        );
                      })}
                      {group.members.length > 5 && (
                        <div>
                          <PhotoUserUnit>
                            +{group.members.length - 5}
                          </PhotoUserUnit>
                        </div>
                      )}
                    </PhotoUsersFromGroup>
                    {/* <InfoNumberOfDonation>
                    <strong>+{group.comunityDonationsPerDay}</strong> Doações por dia
                  </InfoNumberOfDonation> */}
                  </Demonstrator>
                  <Description>{group.description}</Description>
                  <Address>
                    <LocationIcon />
                    {group.address}
                  </Address>
                  <ButtonComponent
                    groupId={group.comunityId}
                    groupName={group.comunityTitle}
                    openJoinModal={openJoinModal}
                    handleCancelRequest={handleCancelRequest}
                    openCancelModal={openCancelModal}
                    sentRequests={sentRequests}
                    hoveringGroupId={hoveringGroupId}
                    setHoveringGroupId={setHoveringGroupId}
                  />
                </ContentCard>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default CardGroup;
