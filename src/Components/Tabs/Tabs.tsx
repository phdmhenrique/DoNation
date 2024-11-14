import { useState, useEffect } from "react";
import {
  Container,
  TabsContainer,
  TabList,
  Tab,
  TabContent,
} from "./Tabs.ts";

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

interface Group {
  comunityId: number;
  comunityTitle: string;
  comunityAccepted: boolean;
  comunitySolicited: boolean;
}

interface TabData {
  icon: JSX.Element;
  title: string;
  content: (
    groups: Group[],
    sentRequests: number[],
    openJoinModal: (groupId: number) => void,
    handleCancelRequest: (groupId: number) => void,
    openCancelModal: (groupId: number, groupName: string) => void,
    hoveringGroupId: number | null,
    setHoveringGroupId: React.Dispatch<React.SetStateAction<number | null>>
  ) => JSX.Element;
}

const Tabs = () => {
  const tabData : TabData[] = [
    {
      icon: <DashboardIcon />,
      title: "Geral",
      content: (
        groups,
        sentRequests,
        openJoinModal,
        handleCancelRequest,
        openCancelModal,
        hoveringGroupId,
        setHoveringGroupId
      ) => (
        <CardGroup
          groups={groups.filter((group) => group.comunityAccepted===false)}
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
        groups,
        sentRequests,
        openJoinModal,
        handleCancelRequest,
        openCancelModal,
        hoveringGroupId,
        setHoveringGroupId
      ) => (
        <CardGroup
          groups={groups.filter((group) => group.comunityAccepted)}
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
        groups,
        sentRequests,
        openJoinModal,
        handleCancelRequest,
        openCancelModal,
        hoveringGroupId,
        setHoveringGroupId
      ) => (
        <CardGroup
          groups={groups.filter((group) => group.comunitySolicited)}
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

  const [activeTab, setActiveTab] = useState<number>(0);
  const [groupData, setGroupData] = useState<Group[]>([]);
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const [hoveringGroupId, setHoveringGroupId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [groupName, setGroupName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroupData();
      setGroupData(data);
    };
    fetchData();
  }, []);

  const updateGroupData = (groupId: number, solicited: boolean) => {
    setGroupData((prevData) =>
      prevData.map((group) =>
        group.comunityId === groupId ? { ...group, comunitySolicited: solicited } : group
      )
    );
  };

  const openJoinModal = (groupId: number) => {
    setSelectedGroupId(groupId);
    setModalOpen(true);
  };

  const closeJoinModal = () => {
    setModalOpen(false);
    setSelectedGroupId(null);
  };

  const openCancelModal = (groupId: number, groupName: string) => {
    setSelectedGroupId(groupId);
    setGroupName(groupName);
    setIsCancelModalOpen(true);
  };

  const handleConfirmJoinModal = () => {
    if (selectedGroupId !== null) {
      updateGroupData(selectedGroupId, true);
      setSentRequests((prev) => [...prev, selectedGroupId]);
      closeJoinModal();
    }
  };

  const handleCancelRequest = (groupId: number) => {
    updateGroupData(groupId, false);
    setSentRequests((prev) => prev.filter((id) => id !== groupId));
    setIsCancelModalOpen(false);
  };

  return (
    <Container>
      <TabsContainer>
        <SearchInput />
        <TabList>
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              $active={activeTab === index}
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
          groupData.find((group) => group.comunityId === selectedGroupId)?.comunityTitle || ""
        }
      />
      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={() => handleCancelRequest(selectedGroupId!)}
        groupName={groupName}
        isCancel={true}
      />
    </Container>
  );
};

export default Tabs;
