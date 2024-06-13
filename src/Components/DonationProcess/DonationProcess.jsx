import React, { useState } from "react";
import {
  Container,
  Item,
  InformationDetails,
  ViewSolicitationAndInfosDonation,
} from "./DonationProcess.js";

import { TabContentForTab } from "../Dashboard/Darshboard.js";
import { TabList, Tab, TabsContainer } from "../../Components/Tabs/Tabs.js";

// API
import { fetchContributionsData } from "../../api/fetchContributionsData.js";

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
    content: <SentAndReceived />,
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

export default function DonationProcess({ group }) {
  const [activeTab, setActiveTab] = useState(0);

  const proccessData = fetchContributionsData();

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

      {activeTab === 0 && <SentAndReceived group={group} />}

      <Container>
        {activeTab === 1 && (
          <>
            {proccessData.map((process, index) => (
              <Item key={index}>
                <InformationDetails>
                  <h2>{process.titleService}</h2>
                  <span>Solicitação Enviada</span>
                </InformationDetails>

                <ViewSolicitationAndInfosDonation>
                  <div className="infos-donation">
                    <img
                      src={process.avatar.image}
                      alt={process.titleService}
                    />
                    <span>{process.date}</span>
                    <span>{process.timeDonationCreated}</span>
                  </div>

                  <div>
                    <button>Visualizar Solicitação</button>
                  </div>
                </ViewSolicitationAndInfosDonation>
              </Item>
            ))}
          </>
        )}

        {activeTab === 2 && (
          <div>
            <h2>Doações Canceladas</h2>
            {group.users.map((user) =>
              user.donations
                .filter((donation) => donation.status === "canceled")
                .map((donation) => (
                  <div key={donation.id}>
                    <p>Usuário: {user.name}</p>
                    <p>Tipo: {donation.type}</p>
                    <p>Data: {donation.date}</p>
                    <p>Quantidade: {donation.amount}</p>
                  </div>
                ))
            )}
          </div>
        )}
      </Container>
    </TabContentForTab>
  );
}
