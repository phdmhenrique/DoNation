import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Container,
  Card,
  TitleAndDateInfos,
  DateInfos,
  InterestsAndDetails,
  ButtonStyledInterests,
  Interests,
  Details,
} from "./CardContributions.js";

// API
import { apiDonations, getGroupImageUrl } from "../../api/axiosConfig.js";

// Icons
import MoreInfoIcon from "../../Icons/MoreInfoIcon.jsx";
import { FaEdit } from "react-icons/fa";
import { PiInfinity } from "react-icons/pi";

const CardContribution = () => {
  const { groupName } = useParams();
  const { user } = useAuth();
  const [myDonations, setMyDonations] = useState([]);
  const [userEmail, setUserEmail] = useState(user.email);

  const handleGetDonations = async () => {
    try {
      const response = await apiDonations.searchDonations(groupName);
      const filteredDonations = response.data.filter(donation => donation.donor.email === userEmail);
      setMyDonations(filteredDonations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetDonations();
  }, [userEmail]);

  return (
    <Container>
      {myDonations.map((donation) => {
        const donationImageUrl = getGroupImageUrl(donation.donationImage);
        const formattedDate = format(new Date(donation.createdAt), "MMMM dd", {
          locale: ptBR,
        });

        return (
          <Card key={donation.id}>
            <img src={donationImageUrl} alt={donation.name} />
            <TitleAndDateInfos>
              <h1>{donation.name}</h1>
              <DateInfos>
                <p>{formattedDate}</p>
                <MoreInfoIcon />
              </DateInfos>
            </TitleAndDateInfos>

            <InterestsAndDetails>
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
                <button>
                  Editar Doação <FaEdit />
                </button>
              </Details>
            </InterestsAndDetails>
          </Card>
        );
      })}
    </Container>
  );
};

export default CardContribution;
