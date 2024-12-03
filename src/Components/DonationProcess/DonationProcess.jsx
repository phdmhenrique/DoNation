import { useState } from "react";
import {
  Container,
  Item,
  InformationDetails,
  ViewSolicitationAndInfosDonation,
} from "./DonationProcess.js";

import { TabContentForTab } from "../Dashboard/Darshboard.js";
import { TabList, Tab, TabsContainer } from "../../Components/Tabs/Tabs.js";

// API
import { fetchMemberDonationsData } from "../../api/fetchMemberDonationsData.js";

// ICONS
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import CheckedIcon from "../../Icons/CheckedIcon.jsx";
import CloseIcon from "../../Icons/CloseIcon.jsx";

// Components
import SentAndReceived from "../SentAndReceived/SentAndReceived.jsx";

const tabData = [
  {
    icon: <DashboardIcon />,
    title: "Em Andamento",
  },
  {
    icon: <CheckedIcon />,
    title: "Concluídos",
  },
  {
    icon: <CloseIcon />,
    title: "Cancelados",
  },
];

export default function DonationProcess({ username }) {
  const [activeTab, setActiveTab] = useState(0);

  const { donations, member } = fetchMemberDonationsData(username);

  const filteredData = donations.filter((donation) => {
    if (activeTab === 1) return donation.donationStatus === 1; // concluídos
    if (activeTab === 2) return donation.donationStatus === 2; // cancelados
    return false;
  });

  return (
    <TabContentForTab>
      <TabsContainer>
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

      {activeTab === 0 && <SentAndReceived donations={donations} member={member} />}

      <Container>
        {filteredData.map((process, index) => (
          <Item key={index}>
            <InformationDetails>
              <h2>{process.donationTitle}</h2>
              <span>
                {process.donationStatus === 1 ? 'Solicitação Concluída' : 'Solicitação Cancelada'}
              </span>
            </InformationDetails>

            <ViewSolicitationAndInfosDonation>
              <div className="infos-donation">
                <img
                  src={member.memberImage}
                  alt={process.donationTitle}
                />
                <div className="divisory"></div>

                <span>{process.donationDate}</span>
                <div className="divisory"></div>

                <span>{process.donationTimeCreated}</span>
              </div>

              <div>
                <button>Visualizar Solicitação</button>
              </div>
            </ViewSolicitationAndInfosDonation>
          </Item>
        ))}
      </Container>
    </TabContentForTab>
  );
}
