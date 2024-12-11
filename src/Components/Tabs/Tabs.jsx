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

  // Atualiza os dados com base na aba ativa
  useEffect(() => {
    const loadData = async () => {
      if (activeTab === 0 && !isDataLoaded.generalGroups) {
        fetchGeneralGroups();
        setIsDataLoaded((prev) => ({ ...prev, generalGroups: true }));
      }
      if (activeTab === 1 && !isDataLoaded.myGroups) {
        fetchMyGroups();
        setIsDataLoaded((prev) => ({ ...prev, myGroups: true }));
      }
      if (activeTab === 2 && !isDataLoaded.joinRequests) {
        fetchJoinRequests();
        setIsDataLoaded((prev) => ({ ...prev, joinRequests: true }));
      }
    };

    loadData();
  }, [activeTab, fetchGeneralGroups, fetchMyGroups, fetchJoinRequests, isDataLoaded]);

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

  const handleCancelRequest = () => {
    setIsCancelModalOpen(false);
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
          openJoinModal={openJoinModal}
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
        <>
          <CardGroup
            groups={myGroups.owner}
            ButtonComponent={ViewGroupButton}
            hoveringGroupName={hoveringGroupName}
            setHoveringGroupName={setHoveringGroupName}
            loggedUser={user}
            noDataMessage="Você ainda não é dono de nenhum grupo."
          />
          <CardGroup
            groups={myGroups.member}
            ButtonComponent={ViewGroupButton}
            hoveringGroupName={hoveringGroupName}
            setHoveringGroupName={setHoveringGroupName}
            noDataMessage="Você ainda não participa de nenhum grupo."
          />
        </>
      ),
    },
    {
      icon: <NewDonationIcon />,
      title: "Solicitações",
      content: (
        <CardGroup
          groups={joinRequests}
          ButtonComponent={RemoveRequestButton}
          openJoinModal={openJoinModal}
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
