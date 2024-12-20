import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  ButtonRecuse,
  ButtonAccept,
  ImageGroup,
  ContainerButtons,
} from "./CardGroup.js";

// Components
import ResultsAndFilters from "./ResultsAndFilters.jsx";
import DefaultAvatar from "../../Assets/default-avatar.png";
import { CustomToastContainer } from "../../Components/Notification/Notification.js";

// API
import {
  getGroupImageUrl,
  getUserImageUrl,
  apiGroups,
} from "../../api/axiosConfig.js";
import { useTabsData } from "../../hooks/useTabsData.js";

// Icons
import GroupIcon from "../../Icons/GroupIcon.jsx";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import NoDataMessage from "../NoDataMessage/NoDataMessage.jsx";
import useFormState from "../../hooks/useFormState.js";

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
    isRequestView = false,
  }) => {
    const { isSubmitting, setIsSubmitting } = useFormState();
    const [activeFilter, setActiveFilter] = useState(defaultFilter);
    const { refetchJoinRequestsOrders, refetchJoinRequestsReceived } =
      useTabsData();

    const handleFilterChange = (filterKey) => {
      if (filterKey !== activeFilter) {
        setActiveFilter(filterKey);
        if (onFilterChange) {
          onFilterChange(filterKey);
        }
      }
    };

    const filteredGroups =
      activeFilter && groups[activeFilter] ? groups[activeFilter] : groups;
    const validFilteredGroups = Array.isArray(filteredGroups)
      ? filteredGroups
      : [];

    const handleAcceptRequest = useCallback(
      async (username, groupname) => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const toastId = toast.loading("Aceitando solicitação...", {
          autoClose: false,
        });

        try {
          await apiGroups.acceptJoinRequestByUserInGroup(username, groupname);
          toast.update(toastId, {
            render: "Solicitação aceita!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        } catch (error) {
          console.error("Erro ao aceitar a solicitação.", error);
          toast.update(toastId, {
            render: "Erro ao tentar aceitar a solicitação!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } finally {
          setIsSubmitting(false);
          refetchJoinRequestsOrders(true);
        }
      },
      [isSubmitting, refetchJoinRequestsOrders, setIsSubmitting]
    );

    const handleRejectRequest = useCallback(
      async (username, groupname) => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const toastId = toast.loading("Recusando solicitação...", {
          autoClose: false,
        });

        try {
          await apiGroups.rejectJoinRequestByUserInGroup(username, groupname);

          toast.update(toastId, {
            render: "Solicitação recusada!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });

          await refetchJoinRequestsReceived(true);
        } catch (error) {
          console.error("Erro ao recusar a solicitação.", error);
          toast.update(toastId, {
            render: "Erro ao tentar recusar a solicitação!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        } finally {
          setIsSubmitting(false);
        }
      },
      [isSubmitting, refetchJoinRequestsReceived, setIsSubmitting]
    );

    return (
      <Container>
        <ResultsAndFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        >
          Exibindo {validFilteredGroups.length} de {validFilteredGroups.length}{" "}
          resultados
        </ResultsAndFilters>
        {validFilteredGroups.length === 0 ? (
          <NoDataMessage message={noDataMessage} />
        ) : (
          validFilteredGroups.map((groupOrRequest, index) => {
            const isReceived = isRequestView && activeFilter === "receiveds";

            const group = isRequestView ? groupOrRequest.group : groupOrRequest;
            const user = isRequestView ? groupOrRequest.user : null;

            const imageGroupUrl = getGroupImageUrl(group.groupImage);
            const imageUserUrl = user ? getUserImageUrl(user.userImage) : null;

            return (
              <Card key={index} $isRequestView={isRequestView && isReceived}>
                <ImageCard>
                  {isRequestView && isReceived ? (
                    <img src={imageUserUrl || DefaultAvatar} alt={user?.name} />
                  ) : (
                    <img
                      src={imageGroupUrl || DefaultAvatar}
                      alt={group.name}
                    />
                  )}
                </ImageCard>
                <ContentCard $isRequestView={isRequestView && isReceived}>
                  <Title>
                    {isRequestView && isReceived ? (
                      <>
                        <strong>{user.name}</strong> quer participar de{" "}
                        <strong>{group.name}</strong>
                      </>
                    ) : (
                      <span>{group.name}</span>
                    )}
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
                  {isReceived ? (
                    <></>
                  ) : (
                    <Description>{group.description}</Description>
                  )}
                  {isReceived ? (
                    <></>
                  ) : (
                    <Address>
                      <LocationIcon />
                      Localidade - {group.address}
                    </Address>
                  )}
                  {/* Botões para aceitar ou recusar solicitação */}
                  {isRequestView && isReceived ? (
                    <ContainerButtons>
                      <ButtonRecuse
                        className="button-recuse"
                        onClick={() =>
                          handleRejectRequest(user.username, group.groupname)
                        }
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Recusando" : "Recusar"}
                      </ButtonRecuse>
                      <ButtonAccept
                        className="button-accept"
                        onClick={() =>
                          handleAcceptRequest(user.username, group.groupname)
                        }
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Aceitando" : "Aceitar"}
                      </ButtonAccept>
                    </ContainerButtons>
                  ) : (
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
                  )}
                </ContentCard>
                {isRequestView && isReceived && (
                  <ImageGroup>
                    <img
                      src={imageGroupUrl || DefaultAvatar}
                      alt={group.name}
                    />
                  </ImageGroup>
                )}
              </Card>
            );
          })
        )}

        <CustomToastContainer style={{ fontSize: "1.6rem" }} />
      </Container>
    );
  }
);

export default CardGroup;
