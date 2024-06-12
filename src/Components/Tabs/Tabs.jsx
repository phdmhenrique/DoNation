import React, { useState, useEffect } from "react";
import {
  Container,
  TabsContainer,
  TabList,
  Tab,
  TabContent,
} from "./Tabs.js";

// Icons
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import UserDonationIcon from "../../Icons/UserDonationIcon.jsx";
import NewDonationIcon from "../../Icons/NewDonationIcon.jsx";

// Componentes
import CardGroup from "../CardGroup/CardGroup.jsx";
import SearchInput from "../SearchInput/SearchInput.jsx";
import ConfirmModal from "../ConfirmationModal/ConfirmationModal.jsx";

// Botões
import JoinCancelButton from "../ButtonsCardGroups/JoinCancelButton.jsx";
import ViewGroupButton from "../ButtonsCardGroups/ViewGroupButton.jsx";
import RemoveRequestButton from "../ButtonsCardGroups/RemoveRequestButton.jsx";

// Função para simular a chamada da API
import { fetchGroupData } from "../../api/fetchGroupData.js";

const Tabs = () => {
  const tabData = [
    {
      icon: <DashboardIcon />,
      title: "Geral",
      content: (groups, sentRequests, openJoinModal, handleCancelRequest, openCancelModal, hoveringGroupId, setHoveringGroupId) => (
        <CardGroup
          groups={groups}
          sentRequests={sentRequests}
          ButtonComponent={JoinCancelButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
          noDataMessage="Não há grupos para serem carregados." // Adicionado
        />
      ),
    },
    {
      icon: <UserDonationIcon />,
      title: "Meus Grupos",
      content: (groups, sentRequests, openJoinModal, handleCancelRequest, openCancelModal, hoveringGroupId, setHoveringGroupId) => (
        <CardGroup
          groups={groups}
          sentRequests={sentRequests}
          ButtonComponent={ViewGroupButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
          noDataMessage="Você ainda não participa de nenhum grupo." // Adicionado
        />
      ),
    },
    {
      icon: <NewDonationIcon />,
      title: "Solicitações",
      content: (groups, sentRequests, openJoinModal, handleCancelRequest, openCancelModal, hoveringGroupId, setHoveringGroupId) => (
        <CardGroup
          groups={groups.filter((group) => group.solicited)}
          sentRequests={sentRequests}
          ButtonComponent={RemoveRequestButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
          noDataMessage="Não há solicitações para serem carregadas." // Adicionado
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [groupData, setGroupData] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [hoveringGroupId, setHoveringGroupId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupName, setGroupName] = useState(""); // Adicionar estado para nome da comunidade
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroupData();
      setGroupData(data);
    };
    fetchData();
  }, []);

  const updateGroupData = (groupId, solicited) => {
    setGroupData((prevData) =>
      prevData.map((group) =>
        group.id === groupId ? { ...group, solicited } : group
      )
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
    setGroupName(groupName); // Adicionando o nome da comunidade ao estado
    setIsCancelModalOpen(true); // Abrir modal de cancelamento
  };

  const handleConfirmJoinModal = () => {
    if (selectedGroupId !== null) {
      updateGroupData(selectedGroupId, true);
      setSentRequests((prev) => [...prev, selectedGroupId]);
      closeJoinModal();
    }
  };

  const handleCancelRequest = (groupId) => {
    updateGroupData(groupId, false);
    setSentRequests((prev) => prev.filter((id) => id !== groupId));
    setIsCancelModalOpen(false); // Fechar modal de cancelamento
  };

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
      <TabContent>
        {tabData[activeTab].content(
          groupData,
          sentRequests,
          openJoinModal,
          handleCancelRequest,
          openCancelModal,
          hoveringGroupId,
          setHoveringGroupId
        )}
      </TabContent>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeJoinModal}
        onConfirm={handleConfirmJoinModal}
        groupName={
          groupData.find((group) => group.id === selectedGroupId)?.title || ""
        }
      />
      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)} // Fechar modal de cancelamento
        onConfirm={() => handleCancelRequest(selectedGroupId)} // Confirmar cancelamento
        groupName={groupName} // Usar estado para o nome da comunidade
        isCancel={true}
      />
    </Container>
  );
};

export default Tabs;
