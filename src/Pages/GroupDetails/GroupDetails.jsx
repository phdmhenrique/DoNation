import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGroupData } from "../../api/fetchGroupData.js";

// Styles
import {
  LazyLoadStyled,
  UserPhoto,
  ComunityInfosAndBack,
  ComunityInformations,
  ComunityAddress,
  ComunityName,
  ComunityUsername,
  ButtonCreateOrEditGroupStyled,
  ButtonsInviteAndShare,
  ButtonInviteOrShare,
  ContainerTabs,
  TabStyled,
  TabListStyled,
  TabContainerStyled,
} from "./GroupDetails.js";
import { Container } from "../../Components/Content/Content.js";
import { TabList, Tab, TabContent } from "../../Components/Tabs/Tabs.js";

// ICONS
import { FaArrowLeft } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import LocationIcon from "../../Icons/LocationIcon.jsx";
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import UserDonationIcon from "../../Icons/UserDonationIcon.jsx";
import NewDonationIcon from "../../Icons/NewDonationIcon.jsx";

// Components
import SearchInput from "../../Components/SearchInput/SearchInput.jsx";
import Dashboard from "../../Components/Dashboard/Darshboard.jsx";
import CardDonation from "../../Components/CardDonation/CardDonation.jsx";
import NewDonations from '../../Components/NewDonations/NewDonations.jsx';

const GroupDetails = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [group, setGroup] = useState(null);

  const { groupId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const groups = await fetchGroupData();
      const group = groups.find(group => group.comunityId === parseInt(groupId));
      setGroup(group);
    }
    fetchData();
  }, [groupId]);

  if (!group) {
    return <div>Grupo não encontrado</div>;
  }

  const tabButtons = [
    {
      text: `Donations`,
    },
    {
      text: `Members (${group.members.length})`,
    },
    {
      text: `Group Rules`,
    },
    {
      text: `About`,
    },
  ];

  const tabData = [
    {
      icon: <DashboardIcon />,
      title: "General",
      content: <CardDonation members={group.members} />,
    },
    {
      icon: <UserDonationIcon />,
      title: "My Donations",
      content: <Dashboard username="alexjohnson" />,
    },
    // {
    //   icon: <NewDonationIcon />,
    //   title: "Nova Doação",
    //   content: <NewDonations />,
    // },
  ];

  return (
    <Container>
      <LazyLoadStyled height={200} offset={100} once>
        <div className="shadow"></div>
        <img src={group.comunityBanner} alt={group.comunityTitle} />
        <UserPhoto>
          <img src={group.comunityImage} alt={group.comunityTitle} />
          <ComunityUsername>
            <p>{group.comunityTitle}</p>
            <p>@{group.comunityUsername}</p>
          </ComunityUsername>
        </UserPhoto>

        <ComunityInfosAndBack>
          <Link to="/home">
            <FaArrowLeft />
          </Link>
          <ComunityInformations>
            <ComunityName>{group.comunityTitle}</ComunityName>
            <ComunityAddress>
              <LocationIcon />
              {group.comunityAddress}
            </ComunityAddress>
          </ComunityInformations>
        </ComunityInfosAndBack>

        {/* <ButtonCreateOrEditGroupStyled>
          <AiFillEdit />
          Editar Grupo
        </ButtonCreateOrEditGroupStyled> */}

        <ButtonsInviteAndShare>
          {/* <ButtonInviteOrShare>
            <RiUserAddFill />
            Convidar Membro
          </ButtonInviteOrShare> */}
          <ButtonInviteOrShare>
            <IoMdShare />
            Share
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
