import { memo } from "react";
import {
  ResultsAndFilters,
  Container,
  Card,
  ImageCard,
  ContentCard,
  Title,
  Demonstrator,
  PhotoUserUnit,
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
import { FaStar } from "react-icons/fa";

// eslint-disable-next-line react/display-name
const CardGroup = memo(({
  groups,
  sentRequests,
  ButtonComponent,
  openJoinModal,
  handleCancelRequest,
  openCancelModal,
  hoveringGroupName,
  setHoveringGroupName,
  noDataMessage,
  loggedUser,
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
                {loggedUser && (
                  <div className="owner-star">
                    <FaStar />
                  </div>
                )}

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
                  </Demonstrator>
                  <Description>{group.description}</Description>
                  <Address>
                    <LocationIcon />
                    {group.address}
                  </Address>
                  <ButtonComponent
                    {...{
                      groupName: group.groupname,
                      openJoinModal,
                      handleCancelRequest,
                      openCancelModal,
                      sentRequests,
                      hoveringGroupName,
                      setHoveringGroupName,
                    }}
                  />
                </ContentCard>
              </Card>
            );
          })}
        </>
      )}
    </Container>
  );
});

export default CardGroup;
