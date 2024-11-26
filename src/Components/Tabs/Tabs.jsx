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

// API
import { apiGroups } from "../../api/axiosConfig.js";
import { useAuth } from "../../Contexts/AuthContext.jsx";

const Tabs = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [generalGroups, setGeneralGroups] = useState([]);
  const [myGroups, setMyGroups] = useState({ owner: [], member: [] });
  const [joinRequests, setJoinRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [hoveringGroupId, setHoveringGroupId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Atualiza grupos de acordo com a aba ativa
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        if (activeTab === 0) {
          // Geral
          const { data } = await apiGroups.listGroupsSearch();
          setGeneralGroups(data || []);
        } else if (activeTab === 1) {
          // Meus Grupos
          const [ownerResponse, memberResponse] = await Promise.all([
            apiGroups.listGroupsOwner(),
            apiGroups.listGroupsMember(),
          ]);
          setMyGroups({
            owner: ownerResponse.data || [],
            member: memberResponse.data || [],
          });
        } else if (activeTab === 2) {
          // Solicitações
          const { data } = await apiGroups.listJoinRequests("");
          setJoinRequests(data || []);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [activeTab]);

  const updateGroupData = (groupId, solicited) => {
    setSentRequests((prev) =>
      solicited ? [...prev, groupId] : prev.filter((id) => id !== groupId)
    );
  };

  const openJoinModal = (groupId) => {
    setSelectedGroupId(groupId);
    setModalOpen(true);
  };

  const closeJoinModal = () => {
    setModalOpen(false);
    setSelectedGroupId(null);
  };

  const openCancelModal = (groupId, groupName) => {
    setSelectedGroupId(groupId);
    setGroupName(groupName);
    setIsCancelModalOpen(true);
  };

  const handleConfirmJoinModal = () => {
    if (selectedGroupId !== null) {
      updateGroupData(selectedGroupId, true);
      closeJoinModal();
    }
  };

  const handleCancelRequest = (groupId) => {
    updateGroupData(groupId, false);
    setIsCancelModalOpen(false);
  };

  const renderContentSkeleton = () => {
    if (loading) {
      return (
        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
          <SkeletonCardGroup />
          <SkeletonCardGroup />
          <SkeletonCardGroup />
        </div>
      )
    }
  
    return tabData[activeTab].content;
  }


  const tabData = [
    {
      icon: <DashboardIcon />,
      title: "Geral",
      content: (
        <CardGroup
          groups={generalGroups}
          sentRequests={sentRequests}
          ButtonComponent={JoinCancelButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
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
            hoveringGroupId={hoveringGroupId}
            setHoveringGroupId={setHoveringGroupId}
            loggedUser={user}
            noDataMessage="Você ainda não é dono de nenhum grupo."
          />
          <CardGroup
            groups={myGroups.member}
            ButtonComponent={ViewGroupButton}
            hoveringGroupId={hoveringGroupId}
            setHoveringGroupId={setHoveringGroupId}
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
          sentRequests={sentRequests}
          ButtonComponent={RemoveRequestButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
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
        groupName={groupName}
      />
      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => handleCancelRequest(selectedGroupId)}
        groupName={groupName}
        isCancel={true}
      />
    </Container>
  );
};

export default Tabs;
