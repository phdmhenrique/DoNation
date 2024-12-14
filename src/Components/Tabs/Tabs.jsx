import { useState, useEffect } from "react";
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
import RequestCardGroup from "../RequestCardGroup/RequestCardGroup.jsx";

// Botões
import JoinCancelButton from "../ButtonsCardGroups/JoinCancelButton.jsx";
import ViewGroupButton from "../ButtonsCardGroups/ViewGroupButton.jsx";
import RemoveRequestButton from "../ButtonsCardGroups/RemoveRequestButton.jsx";

// Contexts e Hooks
import { useAuth } from "../../Contexts/AuthContext.jsx";
import { useTabsData } from "../../hooks/useTabsData";
import { apiGroups } from "../../api/axiosConfig.js";

const Tabs = () => {
  const { user } = useAuth();
  const {
    generalGroups,
    myGroups,
    joinRequests,
    loading,
    fetchGeneralGroups,
    fetchMyGroups,
    fetchJoinRequests,
  } = useTabsData();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("owner");
  const [hoveringGroupName, setHoveringGroupName] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState({
    generalGroups: false,
    myGroups: false,
    joinRequests: false,
  });

  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 0 && !isDataLoaded.generalGroups) {
        await fetchGeneralGroups();
        setIsDataLoaded((prev) => ({ ...prev, generalGroups: true }));
      }
      if (activeTab === 1 && !isDataLoaded.myGroups) {
        await fetchMyGroups(selectedFilter);
        setIsDataLoaded((prev) => ({ ...prev, myGroups: true }));
      }
      if (activeTab === 2 && !isDataLoaded.joinRequests) {
        await fetchJoinRequests();
        setIsDataLoaded((prev) => ({ ...prev, joinRequests: true }));
      }
    };

    loadData();
  }, [
    activeTab,
    fetchGeneralGroups,
    fetchMyGroups,
    fetchJoinRequests,
    isDataLoaded,
    selectedFilter,
  ]);

  const handleFilterChangeMyGroups = async (filterKey) => {
    setSelectedFilter(filterKey);
    await fetchMyGroups(filterKey);
  };

  const handleFilterChangeInvite = async (filterKey) => {
    setSelectedFilter(filterKey);
    await fetchJoinRequests(filterKey);
  }

  const openJoinModal = async (groupName) => {
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
        fetchGeneralGroups();
        setModalOpen(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleCancelRequest = async (groupName) => {
    try {
      await apiGroups.removeGroupsJoinRequestByUser(groupName);
      fetchGeneralGroups();
      setIsCancelModalOpen(false);
    } catch (error) {
      console.error("Erro ao cancelar a solicitação.", error);
    }
  };

  const renderContentSkeleton = () => {
    if (loading) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <SkeletonCardGroup />
          <SkeletonCardGroup />
          <SkeletonCardGroup />
        </div>
      );
    }

    return tabData[activeTab].content;
  };

  const tabData = [
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
          groups={myGroups}
          ButtonComponent={ViewGroupButton}
          filters={[
            { key: "owner", label: "Líder" },
            { key: "member", label: "Membro" },
          ]}
          defaultFilter={selectedFilter}
          onFilterChange={handleFilterChangeMyGroups}
          hoveringGroupName={hoveringGroupName}
          setHoveringGroupName={setHoveringGroupName}
          loggedUser={user}
          noDataMessage="Você ainda não possui grupos nessa categoria."
        />
      ),
    },
    {
      icon: <NewDonationIcon />,
      title: "Solicitações",
      content: (
        <CardGroup
          groups={joinRequests}
          ButtonComponent={RemoveRequestButton}
          filters={[
            { key: "orders", label: "Pedidos" },
            { key: "receiveds", label: "Recebidos" }
          ]}
          isRequestView={true}
          defaultFilter={selectedFilter}
          onFilterChange={handleFilterChangeInvite}
          openCancelModal={closeJoinModal}
          handleCancelRequest={handleCancelRequest}
          hoveringGroupName={hoveringGroupName}
          setHoveringGroupName={setHoveringGroupName}
          noDataMessage="Não há solicitações para serem carregadas."
        />
      ),
    },
  ];

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
        onConfirm={handleCancelRequest}
        groupName={selectedGroupName}
        isCancel={true}
      />
    </Container>
  );
};

export default Tabs;
