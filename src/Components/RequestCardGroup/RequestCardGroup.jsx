import { memo, useState } from "react";
import {
  Container,
  Card,
  ImageCard,
  ContentCard,
  Title,
  Demonstrator,
  Description,
  Address,
  PhotoUsersFromGroup,
} from "../CardGroup/CardGroup.js";

// API
import { getGroupImageUrl, getUserImageUrl } from "../../api/axiosConfig.js";

// Components
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import ResultsAndFilters from "../CardGroup/ResultsAndFilters.jsx";
import GroupIcon from "../../Icons/GroupIcon.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";

// eslint-disable-next-line react/display-name
const RequestCardGroup = memo(
  ({
    groups,
    filters,
    defaultFilter,
    onFilterChange,
    ButtonComponent,
    openJoinModal,
    hoveringGroupName,
    setHoveringGroupName,
    noDataMessage,
  }) => {
    const [activeFilter, setActiveFilter] = useState(defaultFilter);

    const handleFilterChange = (filterKey) => {
      if (filterKey !== activeFilter) {
        setActiveFilter(filterKey);
        if (onFilterChange) {
          onFilterChange(filterKey);
        }
      }
    };

    const filteredGroups = activeFilter && groups[activeFilter] ? groups[activeFilter] : groups;
    const validFilteredGroups = Array.isArray(filteredGroups) ? filteredGroups : [];

    return (
      <Container>
        <ResultsAndFilters
          resultsCount={validFilteredGroups.length}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        {validFilteredGroups.length === 0 ? (
          <NoDataMessage message={noDataMessage} />
        ) : (
          validFilteredGroups.map((request, index) => {
            const { group, user } = request;
            const isReceived = activeFilter === "receiveds";
            const imageGroupUrl = getGroupImageUrl(group.groupImage);
            const imageUserUrl = getUserImageUrl(user.userImage);

            return (
              <Card key={index}>
                <ImageCard>
                  {isReceived ? (
                    <img src={imageUserUrl} alt={user.name} />
                  ) : (
                    <img src={imageGroupUrl} alt={group.name} />
                  )}
                </ImageCard>
                <ContentCard>
                  <Title>{isReceived
                    ? `${user.name} quer entrar na sua comunidade ${group.name}`
                    : group.name}</Title>
                  <Demonstrator>
                    {!isReceived && (
                      <>
                        <GroupIcon />
                        <PhotoUsersFromGroup>
                          {group.members.slice(0, 5).map((member, index) => {
                            const imageMemberUrl = getUserImageUrl(
                              member.userImage
                            );

                            return (
                              <div key={index}>
                                <img src={imageMemberUrl ? imageMemberUrl : DefaultAvatar} alt={member.name} />
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
                      </>
                    )}
                  </Demonstrator>
                  <Description>{group.description}</Description>
                  <Address>
                    <LocationIcon />
                    {group.address}
                  </Address>
                  <ButtonComponent
                    groupName={group.groupname}
                    request={request}
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
