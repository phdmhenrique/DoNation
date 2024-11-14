import React, { useState } from "react";
import { Container, TabContentForTab } from "./Darshboard.js";
import { TabList, Tab, TabsContainer } from "../../Components/Tabs/Tabs.ts";

// ICONS
import DashboardIcon from "../../Icons/DashboardICon.jsx";
import MyContributionicon from "../../Icons/MyContributionIcon.jsx";

// Components
import DonationProcess from '../DonationProcess/DonationProcess.jsx';
import CardContributions from '../CardContributions/CardContributions.jsx';

const tabData = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    content: <DonationProcess />,
  },
  {
    icon: <MyContributionicon />,
    title: "Contribuições",
    content: <CardContributions />,
  },
];

export default function Darshboard({ username }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
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
      <TabContentForTab>
        {React.cloneElement(tabData[activeTab].content, { username })}
      </TabContentForTab>
    </Container>
  );
}
