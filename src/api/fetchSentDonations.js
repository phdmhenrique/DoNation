let sentDonations = [];

export const fetchSentDonations = () => {
    return sentDonations;
};

export const addSentDonation = (donation) => {
    sentDonations.push(donation);
};

export const removeSentDonation = (donationId) => {
    sentDonations = sentDonations.filter(donation => donation.id !== donationId);
};

// Função para simular a atualização do status donationSolicited para true
export const updateDonationSolicited = (donationId) => {
    const donationToUpdate = sentDonations.find(donation => donation.donationId === donationId);
    if (donationToUpdate) {
        donationToUpdate.donationSolicited = true;
    }
};
