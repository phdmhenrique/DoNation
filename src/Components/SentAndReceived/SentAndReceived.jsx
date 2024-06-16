import React, { useState } from "react";
import { TabContentForTab } from "../Dashboard/Darshboard.js";
import { TabList, Tab, TabsContainer } from "../../Components/Tabs/Tabs.js";
import {
  Container,
  Item,
  InformationDetails,
  ViewSolicitationAndInfosDonation,
} from "../DonationProcess/DonationProcess.js";

// API
import { fetchMemberDonationsData } from "../../api/fetchMemberDonationsData.js";
// import { fetchGroupData } from "../../api/fetchGroupData.js";

// ICONS
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const tabData = [
  {
    icon: <FaArrowRightLong />,
    title: "Enviadas",
  },
  {
    icon: <FaArrowLeftLong />,
    title: "Recebidas",
  },
];

export default function SentAndReceived({ username}) {
  const [activeTab, setActiveTab] = useState(0);
  const { donations, member } = fetchMemberDonationsData(username);

  const filteredData = donations.filter((donation) => {
    if (activeTab === 0) return donation.donationStatus === 0; // enviada
    if (activeTab === 3) return donation.donationStatus === 3; // recebidas
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

      <Container>
        {filteredData.map((process, index) => (
          <Item key={index}>
            <InformationDetails>
              <h2>{process.donationTitle}</h2>
              <span>
                {process.donationStatus === 0
                  ? "Solicitação Enviada"
                  : "Solicitação Recebida"}
              </span>
            </InformationDetails>

            <ViewSolicitationAndInfosDonation>
              <div className="infos-donation">
                <img src={member.memberImage} alt={process.donationTitle} />
                <span>{process.donationDate}</span>
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
