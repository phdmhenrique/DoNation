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

import { fetchMemberDonationsData } from "../../api/fetchMemberDonationsData.js";

// Icons
import MoreInfoIcon from "../../Icons/MoreInfoIcon.jsx";
import { FaEdit } from "react-icons/fa";

const CardContribution = ({ username }) => {
  const { donations } = fetchMemberDonationsData(username);

  return (
    <Container>
      {donations.map((donation) => (
        <Card key={donation.donationId}>
          <img src={donation.donationBanner} alt={donation.donationTitle} />
          <TitleAndDateInfos>
            <h1>{donation.donationTitle}</h1>
            <DateInfos>
              <p>{donation.donationDate}</p>
              <MoreInfoIcon />
            </DateInfos>
          </TitleAndDateInfos>

          <InterestsAndDetails>
            <Interests>
              {donation.donationTags.map((tag, index) => (
                <ButtonStyledInterests key={index} className="inactive">
                  #{tag}
                </ButtonStyledInterests>
              ))}
            </Interests>

            <Details>
              <div>
                <span>Availability</span>
                <p>{donation.donationQuantityAvailability}</p>
              </div>
              <button>Edit Donation <FaEdit /></button>
            </Details>
          </InterestsAndDetails>
        </Card>
      ))}
    </Container>
  );
};

export default CardContribution;
