import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalize } from "@mui/material";
import { useParams } from "react-router-dom";

// Estilos
import {
  Card,
  CardInfoUser,
  CardInfoUserDetails,
  Usernames,
  ContributionDate,
  ContributionService,
  ContributionServiceTitle,
  InterestsAndDetailsStyled,
} from "./CardDonationItem.js";

// Components
import {
  ButtonStyledInterests,
  Interests,
  Details,
} from "../CardContributions/CardContributions.js";

// ICONS
import MoreInfoIcon from "../../Icons/MoreInfoIcon.jsx";
import MyContributionIcon from "../../Icons/MyContributionIcon.jsx";
import { PiInfinity } from "react-icons/pi";

// Fallback images
import DefaultAvatar from "../../Assets/default-avatar.png";

// API
import { getUserImageUrl, getGroupImageUrl, apiDonations } from "../../api/axiosConfig.js";

// Hooks
import useFormState from "../../hooks/useFormState.js";

const CardDonationItem = ({ donation }) => {
  const { groupName } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Seg");
  const donorImageUrl = getUserImageUrl(donation.donor.userImage);
  const donationImageUrl = getGroupImageUrl(donation.donationImage);
  const { isSubmitting, setIsSubmitting } = useFormState();

  const formattedDate = format(new Date(donation.createdAt), "MMMM dd", {
    locale: ptBR,
  });

  const daysOfWeek = [
    { id: "MONDAY", label: "Seg" },
    { id: "TUESDAY", label: "Ter" },
    { id: "WEDNESDAY", label: "Qua" },
    { id: "THURSDAY", label: "Qui" },
    { id: "FRIDAY", label: "Sex" },
    { id: "SATURDAY", label: "Sáb" },
    { id: "SUNDAY", label: "Dom" },
  ];

  const handleRequestClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true); 

    try {
      await apiDonations.createRequestToDonation(donation.id, groupName);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const getAvailableTimes = () => {
    const selectedDayData = donation.avaliableDate.find(
      (day) => daysOfWeek.find((d) => d.label === selectedDay)?.id === day.day
    );
    if (!selectedDayData || !selectedDayData.avaliableTime) return [];
    return selectedDayData.avaliableTime.sort();
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <Card>
      <CardInfoUser>
        <CardInfoUserDetails>
          <img
            src={donorImageUrl || DefaultAvatar}
            alt={`Imagem do ${donation.donor.username}`}
          />
          <Usernames>
            <span>{donation.donor.name}</span>
            <p>{donation.donor.username}</p>
          </Usernames>
        </CardInfoUserDetails>

        <ContributionDate>
          {capitalize(formattedDate)}
          <MoreInfoIcon />
        </ContributionDate>
      </CardInfoUser>

      <ContributionServiceTitle>{donation.name}</ContributionServiceTitle>

      <ContributionService
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`alternative-content ${isHovered ? "show" : ""}`}>
          <div className="description-contribution">{donation.description}</div>

          <div className="container-availability__contribution">
            <div className="availability-contribution">
              <div className="days">
                {daysOfWeek.map((day) => (
                  <div
                    key={day.id}
                    className={`day ${
                      selectedDay === day.label ? "active" : ""
                    }`}
                    onClick={() => handleDayClick(day.label)}
                  >
                    {day.label}
                  </div>
                ))}
              </div>

              <div className="availability-hours__title">
                Horários Disponíveis
              </div>
              {getAvailableTimes().length > 0 ? (
                <div className="availability-hours">
                  {getAvailableTimes().map((hour, index) => (
                    <div key={index} className="hour available">
                      {hour}
                    </div>
                  ))}
                </div>
              ) : (
                <span>Não há horários disponíveis para este dia.</span>
              )}
              <div className="availability-address">
                Endereço: {donation.address}
              </div>
            </div>
          </div>
        </div>

        <div className={`contribution__service-banner ${isHovered ? "fade" : ""}`}>
          <img src={donationImageUrl} alt={donation.name} />
        </div>
      </ContributionService>

      <InterestsAndDetailsStyled>
        <Interests>
          {donation.tags.map((tag, index) => (
            <ButtonStyledInterests key={index} className="inactive">
              #{tag}
            </ButtonStyledInterests>
          ))}
        </Interests>

        <Details>
          <div>
            <span>Disponibilidade</span>
            <p>{donation.availability === "INF" || donation.availability === "AVAILABLE" ? <PiInfinity /> : donation.availability}</p>
          </div>
          <button
            disabled={isSubmitting}
            onClick={handleRequestClick}
          >
            {isSubmitting ? "Solicitado" : "Solicitar"}{" "}
            <MyContributionIcon />
          </button>
        </Details>
      </InterestsAndDetailsStyled>
    </Card>
  );
};

export default CardDonationItem;
