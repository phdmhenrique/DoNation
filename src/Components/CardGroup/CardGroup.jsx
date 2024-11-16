import React from "react";
import {
  ResultsAndFilters,
  Container,
  Card,
  ImageCard,
  ContentCard,
  Title,
  Demonstrator,
  PhotoUserUnit,
  InfoNumberOfDonation,
  Description,
  Address,
  PhotoUsersFromGroup,
} from "./CardGroup.js";

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
            Displaying  {groups.length} of {groups.length} results
          </ResultsAndFilters>
          {groups.map((group) => (
            <Card key={group.comunityId}>
              <ImageCard>
                <img src={group.comunityImage} alt={group.comunityTitle} />
              </ImageCard>
              <ContentCard>
                <Title>{group.comunityTitle}</Title>
                <Demonstrator>
                  <GroupIcon />
                  <PhotoUsersFromGroup>
                    {group.members.slice(0, 5).map((member, index) => (
                      <div key={index}>
                        <img src={member.memberImage} alt={`User ${index + 1}`} />
                      </div>
                    ))}
                    {group.members.length > 5 && (
                      <div>
                        <PhotoUserUnit>+{group.members.length - 5}</PhotoUserUnit>
                      </div>
                    )}
                  </PhotoUsersFromGroup>
                  <InfoNumberOfDonation>
                    <strong>+{group.comunityDonationsPerDay}</strong> Donations per day
                  </InfoNumberOfDonation>
                </Demonstrator>
                <Description>{group.comunityDescription}</Description>
                <Address>
                  <LocationIcon />
                  {group.comunityAddress}
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
          ))}
        </>
      )}
    </Container>
  );
};

export default CardGroup;
