import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, ContainerCard } from "./CardDonation.js";

// Components
import CardDonationItem from "../CardDonationItem/CardDonationItem.jsx";
import ResultsAndFilters from "../CardGroup/ResultsAndFilters.jsx";

// API
import { apiDonations } from "../../api/axiosConfig.js";
import SkeletonCardDonation from "../Skeletons/SkeletonCardDonationItem/SkeletonCardDonationItem.jsx";

export default function CardDonation() {
  const { groupName } = useParams();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);

      try {
        const response = await apiDonations.searchDonations(groupName);
        setDonations(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (groupName) {
      fetchDonations();
    }
  }, [groupName]);

  if (loading) {
    return (
      <Container>
        <SkeletonCardDonation />
        <SkeletonCardDonation />
        <SkeletonCardDonation />
      </Container>
    );
  }

  return (
    <Container>
      {donations.length === 0 ? (
        <ResultsAndFilters padding="0 1.4rem">
          Não há doações disponíveis para este grupo.
        </ResultsAndFilters>
      ) : (
        <>
          <ContainerCard>
            <ResultsAndFilters padding="0 1.4rem">
              Exibindo {donations.length} de {donations.length} resultados
            </ResultsAndFilters>
            {donations.map((donation) => (
              <CardDonationItem
                key={donation.id}
                donation={donation}
              />
            ))}
          </ContainerCard>
        </>
      )}
    </Container>
  );
}
