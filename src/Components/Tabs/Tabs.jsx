import { useState } from "react";
import { Container, TabsContainer, TabList, Tab, TabContent } from "./Tabs.js";

// Hooks
import { useGroupData } from "../../hooks/useGroupData.js";

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

const Tabs = () => {
  const { groups: rawGroups } = useGroupData("search");
  const validateGroups = Array.isArray(rawGroups) ? rawGroups : [];
  const [activeTab, setActiveTab] = useState(0);
  const [sentRequests, setSentRequests] = useState([]);
  const [hoveringGroupId, setHoveringGroupId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

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

  const tabData = [
    {
      icon: <DashboardIcon />,
      title: "Geral",
      content: (
        <CardGroup
          groups={validateGroups}
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
        <CardGroup
          groups={validateGroups?.filter((group) => group.comunityAccepted) || []}
          sentRequests={sentRequests}
          ButtonComponent={ViewGroupButton}
          openJoinModal={openJoinModal}
          handleCancelRequest={handleCancelRequest}
          openCancelModal={openCancelModal}
          hoveringGroupId={hoveringGroupId}
          setHoveringGroupId={setHoveringGroupId}
          noDataMessage="Você ainda não participa de nenhum grupo."
        />
      ),
    },
    {
      icon: <NewDonationIcon />,
      title: "Solicitações",
      content: (
        <CardGroup
          groups={validateGroups?.filter((group) => group.comunitySolicited) || []}
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
      <TabContent>
        {tabData[activeTab].content}
      </TabContent>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={closeJoinModal}
        onConfirm={handleConfirmJoinModal}
        groupName={
          validateGroups.find((group) => group.comunityId === selectedGroupId)
            ?.comunityTitle || ""
        }
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
