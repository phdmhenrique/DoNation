import { useCallback, useMemo, useState } from "react";
import { Container, TabsContainer, TabList, Tab, TabContent } from "./Tabs.js";

// Icons
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import UserDonationIcon from "../../Icons/UserDonationIcon.jsx";
import NewDonationIcon from "../../Icons/NewDonationIcon.jsx";

// Componentes
import CardGroup from "../CardGroup/CardGroup.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import ConfirmModal from "../ConfirmationModal/ConfirmationModal.jsx";
import SkeletonCardGroup from "../Skeletons/SkeletonCardGroup/SkeletonCardGroup.jsx";

// Botões
import JoinCancelButton from "../ButtonsCardGroups/JoinCancelButton.jsx";
import ViewGroupButton from "../ButtonsCardGroups/ViewGroupButton.jsx";
import RemoveRequestButton from "../ButtonsCardGroups/RemoveRequestButton.jsx";

// Contexts e Hooks
import { useTabsData } from "../../hooks/useTabsData";
import { apiGroups } from "../../api/axiosConfig.js";

const Tabs = () => {
  const {
    generalGroups,
    myGroups,
    joinRequests,
    loading,
    refetchGeneralGroups,
    refetchOwnerGroups,
    refetchMemberGroups,
    refetchJoinRequestsOrders,
    refetchJoinRequestsReceived,
  } = useTabsData();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedFilterToMyGroups, setSelectedFilterToMyGroups] = useState("owner");
  const [selectedFilterToMyRequests, setSelectedFilterToMyRequests] = useState("orders");
  const [hoveringGroupName, setHoveringGroupName] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleFilterChangeMyGroups = useCallback((filterKey) => {
    setSelectedFilterToMyGroups(filterKey);
    filterKey === "owner" ? refetchOwnerGroups() : refetchMemberGroups();
  }, [refetchOwnerGroups, refetchMemberGroups])

  const handleFilterChangeInvite = useCallback((filterKey) => {
    setSelectedFilterToMyRequests(filterKey);
    filterKey === "orders" ? refetchJoinRequestsOrders() : refetchJoinRequestsReceived();
  }, [refetchJoinRequestsOrders, refetchJoinRequestsReceived])

  const openJoinModal = (groupName) => {
    setSelectedGroupName(groupName);
    setGroupName(groupName);
    setModalOpen(true);
  };

  const closeJoinModal = () => {
    setModalOpen(false);
    setSelectedGroupName(null);
  };

  const handleConfirmJoinModal = async () => {
    if (selectedGroupName !== null) {
      try {
        await apiGroups.registerJoinGroup(groupName);
        refetchGeneralGroups();
      } catch (error) {
        console.log(error.message);
      } finally {
        setModalOpen(false);
      }
    }
  };

  const handleCancelRequest = useCallback(async (groupName) => {
    try {
      await apiGroups.deleteJoinRequestToGroup(groupName);
      refetchGeneralGroups();
      refetchJoinRequestsOrders();
      setIsCancelModalOpen(false);
    } catch (error) {
      console.error("Erro ao cancelar a solicitação.", error);
    }
  }, [refetchGeneralGroups, refetchJoinRequestsOrders])

  const renderContentSkeleton = () => {
    if (activeTab === 0 && loading.generalGroups) return <SkeletonLoader />;
    if (activeTab === 1 && loading.ownerGroups && selectedFilterToMyGroups === "owner")
      return <SkeletonLoader />;
    if (activeTab === 1 && loading.memberGroups && selectedFilterToMyGroups === "member")
      return <SkeletonLoader />;
    if (activeTab === 2 && loading.joinRequestsOrders && selectedFilterToMyRequests === "orders")
      return <SkeletonLoader />;
    if (
      activeTab === 2 &&
      loading.joinRequestsReceived &&
      selectedFilterToMyRequests === "receiveds"
    )
      return <SkeletonLoader />;
    return tabData[activeTab].content;
  };

  const SkeletonLoader = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <SkeletonCardGroup />
      <SkeletonCardGroup />
      <SkeletonCardGroup />
    </div>
  );

  const tabData = useMemo(
    () => [
      {
        icon: <DashboardIcon />,
        title: "Geral",
        content: (
          <CardGroup
            groups={generalGroups}
            ButtonComponent={JoinCancelButton}
            filters={[]}
            defaultFilter={null}
            openJoinModal={openJoinModal}
            handleCancelRequest={handleCancelRequest}
            hoveringGroupName={hoveringGroupName}
            setHoveringGroupName={setHoveringGroupName}
            noDataMessage="Não há grupos para serem carregados."
          />
        ),
      },
      {
        icon: <UserDonationIcon />,
        title: "Meus Grupos",
        content: (
          <CardGroup
            groups={myGroups[selectedFilterToMyGroups] || []}
            ButtonComponent={ViewGroupButton}
            filters={[
              { key: "owner", label: "Líder" },
              { key: "member", label: "Membro" },
            ]}
            defaultFilter={selectedFilterToMyGroups}
            activeTab={activeTab}
            onFilterChange={handleFilterChangeMyGroups}
            hoveringGroupName={hoveringGroupName}
            setHoveringGroupName={setHoveringGroupName}
            noDataMessage="Você ainda não possui grupos nessa categoria."
          />
        ),
      },
      {
        icon: <NewDonationIcon />,
        title: "Solicitações",
        content: (
          <CardGroup
            groups={joinRequests[selectedFilterToMyRequests] || []}
            ButtonComponent={RemoveRequestButton}
            filters={[
              { key: "orders", label: "Pedidos" },
              { key: "receiveds", label: "Recebidos" },
            ]}
            isRequestView={true}
            activeTab={activeTab}
            defaultFilter={selectedFilterToMyRequests}
            onFilterChange={handleFilterChangeInvite}
            openCancelModal={closeJoinModal}
            handleCancelRequest={handleCancelRequest}
            hoveringGroupName={hoveringGroupName}
            setHoveringGroupName={setHoveringGroupName}
            noDataMessage="Não há solicitações para serem carregadas."
          />
        ),
      },
    ],
    [
      generalGroups,
      myGroups,
      joinRequests,
      selectedFilterToMyGroups,
      selectedFilterToMyRequests,
      handleCancelRequest,
      handleFilterChangeInvite,
      handleFilterChangeMyGroups,
      hoveringGroupName,
    ]
  );

  return (
    <Container>
      <TabsContainer>
        <SearchInput />
        <TabList>
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              active={activeTab === index ? "true" : undefined}
              onClick={() => setActiveTab(index)}
            >
              {tab.icon}
              {tab.title}
            </Tab>
          ))}
        </TabList>
      </TabsContainer>
      <TabContent>{renderContentSkeleton()}</TabContent>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeJoinModal}
        onConfirm={handleConfirmJoinModal}
        groupName={selectedGroupName}
      />
      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => handleCancelRequest(selectedGroupName)}
        groupName={selectedGroupName}
        isCancel={true}
      />
    </Container>
  );
};

export default Tabs;
