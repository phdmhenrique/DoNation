import { useState } from "react";
import {
  Card,
  CardInfoUser,
  CardInfoUserDetails,
  Usernames,
  ContributionDate,
  ContributionService,
  ContributionServiceTitle,
  ContributionServiceBanner,
  InterestsAndDetailsStyled,
} from "./CardDonationItem.js";
import {
  ButtonStyledInterests,
  Interests,
  Details,
} from "../CardContributions/CardContributions.js";

// ICONS
import MoreInfoIcon from "../../Icons/MoreInfoIcon.jsx";
import MyContributionIcon from "../../Icons/MyContributionIcon.jsx";

// Importe a função de atualização do status donationSolicited
import { updateDonationSolicited } from "../../api/fetchSentDonations.js";

const CardDonationItem = ({ donation, onDonationRequest, onRequestClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Seg");

  const handleRequestClick = () => {
    // Chame a função de atualização do status donationSolicited
    updateDonationSolicited(donation.donationId);
    onRequestClick(donation.donationId);
  };

  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const hours = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0") + ":00"
  );

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const isHourAvailable = (hour) => {
    return donation.donationAvailability[selectedDay].includes(hour);
  };

  return (
    <Card>
      <CardInfoUser>
        <CardInfoUserDetails>
          <img
            src={donation.member.memberImage}
            alt={donation.member.memberUsername}
          />
          <Usernames>
            <span>{donation.member.memberName}</span>
            <p>@{donation.member.memberUsername}</p>
          </Usernames>
        </CardInfoUserDetails>

        <ContributionDate>
          {donation.donationDate}
          <MoreInfoIcon />
        </ContributionDate>
      </CardInfoUser>

      <ContributionServiceTitle>
        {donation.donationTitle}
      </ContributionServiceTitle>

      <ContributionService
        className={`${isHovered ? "hovered" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className="alternative-content">
            <div className="description-contribution">
              {donation.donationDescription}
            </div>

            <div className="container-availability__contribution">
              <div className="availability-contribution">
                <div className="days">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className={`day ${selectedDay === day ? "active" : ""}`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="availability-hours__title">
                  Horários Disponíveis
                </div>
                <div className="availability-hours">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className={`hour ${
                        isHourAvailable(hour) ? "available" : ""
                      }`}
                    >
                      {hour}
                    </div>
                  ))}
                </div>

                <div className="availability-address">
                  Endereço: {donation.donationAddress}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ContributionServiceBanner style={{ height: "25rem" }}>
            <img src={donation.donationBanner} alt={donation.donationTitle} />
          </ContributionServiceBanner>
        )}
      </ContributionService>

      <InterestsAndDetailsStyled>
        <Interests>
          {donation.donationTags.map((tag, index) => (
            <ButtonStyledInterests key={index} className="inactive">
              #{tag}
            </ButtonStyledInterests>
          ))}
        </Interests>

        <Details>
          <div>
            <span>Disponibilidade</span>
            <p>{donation.donationQuantityAvailability}</p>
          </div>
          <button
            onClick={handleRequestClick}
            disabled={donation.donationSolicited}
          >
            {donation.donationSolicited ? "Solicitado" : "Solicitar"} <MyContributionIcon />
          </button>
        </Details>
      </InterestsAndDetailsStyled>
    </Card>
  );
};

export default CardDonationItem;
