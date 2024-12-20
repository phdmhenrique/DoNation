import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import {
  LazyLoadStyled,
  UserPhoto,
  ComunityInfosAndBack,
  ComunityInformations,
  ComunityAddress,
  ComunityName,
  ComunityUsername,
  ButtonsInviteAndShare,
  ButtonInviteOrShare,
  ContainerTabs,
  TabStyled,
  TabListStyled,
  TabContainerStyled,
  ButtonCreateOrEditGroupStyled,
} from "./GroupDetails.js";
import { Container } from "../../Components/Content/Content.js";
import { TabList, Tab, TabContent } from "../../Components/Tabs/Tabs.js";

// API
import { apiGroups, getGroupImageUrl } from "../../api/axiosConfig.js";

// ICONS
import { FaArrowLeft } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import UserDonationIcon from "../../Icons/UserDonationIcon.jsx";

// Components
import SearchInput from "../../Components/SearchInput/SearchInput.jsx";
import Dashboard from "../../Components/Dashboard/Darshboard.jsx";
import CardDonation from "../../Components/CardDonation/CardDonation.jsx";
import NewDonations from "../../Components/NewDonations/NewDonations.jsx";
import NewDonationIcon from "../../Icons/NewDonationIcon.jsx";
import SkeletonGroupDetails from "../../Components/Skeletons/SkeletonGroupDetails/SkeletonGroupDetails.jsx";
import { AiFillEdit } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";

const GroupDetails = () => {
  const { user } = useAuth();
  const { groupName } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.title = `DoNation - ${group?.name || "Grupo"}`;
  }, [group]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await apiGroups.listDetailsForGroup(groupName);
        setGroup(response.data);
      } catch (err) {
        setError("Erro ao carregar os detalhes do grupo.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [groupName]);

  if (loading) {
    return (
      <Container>
        <LazyLoadStyled height={200} offset={100} once>
          <SkeletonGroupDetails />
        </LazyLoadStyled>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <LazyLoadStyled height={200} offset={100} once>
          {error}
        </LazyLoadStyled>
      </Container>
    );
  }

  if (!group) {
    return (
      <Container>
        <LazyLoadStyled height={200} offset={100} once>
          Grupo não encontrado
        </LazyLoadStyled>
      </Container>
    );
  }

  const tabButtons = [
    {
      text: `Doações`,
    },
    {
      text: `Membros (${group.members.length || 0})`,
    },
    {
      text: `Regras do Grupo`,
    },
    {
      text: `Sobre`,
    },
  ];

  const tabData = [
    {
      icon: <DashboardIcon />,
      title: "Geral",
      content: <CardDonation members={group.members} />,
    },
    {
      icon: <UserDonationIcon />,
      title: "Minhas Doações",
      content: <Dashboard username={group.owner.username} />,
    },
    {
      icon: <NewDonationIcon />,
      title: "Nova Doação",
      content: <NewDonations />,
    },
  ];

  return (
    <Container>
      <LazyLoadStyled height={200} offset={100} once>
        <div className="shadow"></div>
        <img src={getGroupImageUrl(group.landscapeImage)} alt={group.name} />
        <UserPhoto>
          <img src={getGroupImageUrl(group.groupImage)} alt={group.name} />
          <ComunityUsername>
            <p>{group.name}</p>
            <p>{group.groupname}</p>
          </ComunityUsername>
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityName>{group.name}</ComunityName>
            <ComunityAddress>
              <LocationIcon />
              {group.address}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>

        {user.username === group.owner.username ? (
          <ButtonCreateOrEditGroupStyled to={`/home/group/${groupName}/edit`} style={{ zIndex: 1 }}>
            <AiFillEdit />
            Editar Grupo
          </ButtonCreateOrEditGroupStyled>
        ) : (
          ""
        )}

        <ButtonsInviteAndShare>
          {user.username === group.owner.username ? (
            <ButtonInviteOrShare>
              <RiUserAddFill />
              Convidar Membro
            </ButtonInviteOrShare>
          ) : (
            ""
          )}
          <ButtonInviteOrShare>
            <IoMdShare />
            Compartilhar
          </ButtonInviteOrShare>
        </ButtonsInviteAndShare>
      </LazyLoadStyled>

      <ContainerTabs>
        <TabListStyled>
          {tabButtons.map((tab, index) => (
            <TabStyled
              key={index}
              active={activeButton === index ? "true" : undefined}
              onClick={() => setActiveButton(index)}
            >
              {tab.text}
            </TabStyled>
          ))}
        </TabListStyled>
      </ContainerTabs>

      <TabContainerStyled>
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
      </TabContainerStyled>

      <TabContent>{tabData[activeTab].content}</TabContent>
    </Container>
  );
};

export default GroupDetails;
