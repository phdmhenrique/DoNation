// Simula um banco de dados de solicitações enviadas
let sentRequests = [];

export const fetchSentRequests = () => {
    return sentRequests;
};

export const addSentRequest = (group) => {
    sentRequests.push(group);
};

export const removeSentRequest = (groupId) => {
    sentRequests = sentRequests.filter(group => group.id !== groupId);
};
