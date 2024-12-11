import { memo, useState } from "react";
import {
  // ResultsAndFilters,
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

    const filteredGroups = activeFilter ? groups[activeFilter] || [] : [];

    return (
      <Container>
        <ResultsAndFilters
          resultsCount={filteredGroups.length}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        {filteredGroups.length === 0 ? (
          <NoDataMessage message={noDataMessage} />
        ) : (
          filteredGroups.map((group, index) => {
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
                      request: group.request,
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
