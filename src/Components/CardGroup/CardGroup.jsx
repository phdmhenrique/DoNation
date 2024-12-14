import { memo, useState } from "react";
import {
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

// Components
import ResultsAndFilters from "./ResultsAndFilters.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";

// API
import { getGroupImageUrl, getUserImageUrl } from "../../api/axiosConfig.js";

// Icons
import GroupIcon from "../../Icons/GroupIcon.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";
import { FaStar } from "react-icons/fa";

// eslint-disable-next-line react/display-name
const CardGroup = memo(
  ({
    groups,
    filters,
    defaultFilter,
    onFilterChange,
    ButtonComponent,
    openJoinModal,
    handleCancelRequest,
    openCancelModal,
    hoveringGroupName,
    setHoveringGroupName,
    noDataMessage,
    loggedUser,
    isRequestView = false, // Novo prop para diferenciar solicitações
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
          validFilteredGroups.map((groupOrRequest, index) => {
            // Verifica se é uma exibição de solicitações
            const isReceived = isRequestView && activeFilter === "receiveds";
            const group = isRequestView ? groupOrRequest.group : groupOrRequest;
            const user = isRequestView ? groupOrRequest.user : null;

            const imageGroupUrl = getGroupImageUrl(group.groupImage);
            const imageUserUrl = user ? getUserImageUrl(user.userImage) : null;

            return (
              <Card key={index}>
                {loggedUser && (
                  <div className="owner-star">
                    <FaStar />
                  </div>
                )}

                <ImageCard>
                  {isRequestView && isReceived ? (
                    <img src={imageUserUrl || DefaultAvatar} alt={user?.name} />
                  ) : (
                    <img src={imageGroupUrl || DefaultAvatar} alt={group.name} />
                  )}
                </ImageCard>
                <ContentCard>
                  <Title>
                    {isRequestView && isReceived
                      ? `${user.name} quer entrar na sua comunidade ${group.name}`
                      : group.name}
                  </Title>
                  <Demonstrator>
                    <GroupIcon />
                    <PhotoUsersFromGroup>
                      {group.members.slice(0, 5).map((member, index) => {
                        const imageMemberUrl = getUserImageUrl(
                          member.userImage
                        );

                        return (
                          <div key={index}>
                            <img
                              src={imageMemberUrl || DefaultAvatar}
                              alt={member.name}
                            />
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
                      request: groupOrRequest.request,
                      openJoinModal,
                      handleCancelRequest,
                      openCancelModal,
                      hoveringGroupName,
                      setHoveringGroupName,
                    }}
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

export default CardGroup;
