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
} from "../CardGroup/CardGroup.js";

// API
import { getGroupImageUrl, getUserImageUrl } from "../../api/axiosConfig.js";

// Components
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import ResultsAndFilters from "../CardGroup/ResultsAndFilters.jsx";

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
            const { group } = request;
            console.log(group);
            const imageGroupUrl = getGroupImageUrl(group.groupImage);
            return (
              <Card key={index}>
                <ImageCard>
                  <img src={imageGroupUrl} alt={group.name} />
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
