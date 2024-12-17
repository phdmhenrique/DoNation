import useSWR from "swr";
import { apiGroups } from "../api/axiosConfig";

const fetcher = (url, filter) => {
  switch (url) {
    case "generalGroups":
      return apiGroups.listGroupsSearch().then((res) => res.data || []);
    case "myGroups":
      return filter === "owner"
        ? apiGroups.listGroupsOwner().then((res) => res.data || [])
        : apiGroups.listGroupsMember().then((res) => res.data || []);
    case "joinRequests":
      return filter === "orders"
        ? apiGroups.listGroupsJoinRequestsByMe().then((res) => res.data || [])
        : apiGroups.listGroupsJoinRequestsToOwner().then((res) => res.data || []);
    default:
      return [];
  }
};

export const useTabsData = () => {
  // Grupos Gerais
  const {
    data: generalGroups = [],
    isLoading: generalGroupsLoading,
    mutate: mutateGeneralGroups,
  } = useSWR("generalGroups", fetcher);

  // Meus Grupos
  const {
    data: ownerGroups = [],
    isLoading: ownerGroupsLoading,
    mutate: mutateOwnerGroups,
  } = useSWR(["myGroups", "owner"], ([url, filter]) => fetcher(url, filter));

  const {
    data: memberGroups = [],
    isLoading: memberGroupsLoading,
    mutate: mutateMemberGroups,
  } = useSWR(["myGroups", "member"], ([url, filter]) => fetcher(url, filter));

  // Solicitações
  const {
    data: joinRequestsOrders = [],
    isLoading: joinRequestsOrdersLoading,
    mutate: mutateJoinRequestsOrders,
  } = useSWR(["joinRequests", "orders"], ([url, filter]) => fetcher(url, filter));

  const {
    data: joinRequestsReceived = [],
    isLoading: joinRequestsReceivedLoading,
    mutate: mutateJoinRequestsReceived,
  } = useSWR(["joinRequests", "receiveds"], ([url, filter]) => fetcher(url, filter));

  // Funções de revalidação manual
  const refetchGeneralGroups = () => mutateGeneralGroups();
  const refetchOwnerGroups = () => mutateOwnerGroups();
  const refetchMemberGroups = () => mutateMemberGroups();
  const refetchJoinRequestsOrders = () => mutateJoinRequestsOrders();
  const refetchJoinRequestsReceived = () => mutateJoinRequestsReceived();

  return {
    // Dados
    generalGroups,
    myGroups: { owner: ownerGroups, member: memberGroups },
    joinRequests: { orders: joinRequestsOrders, receiveds: joinRequestsReceived },

    // Loading States
    loading: {
      generalGroups: generalGroupsLoading,
      ownerGroups: ownerGroupsLoading,
      memberGroups: memberGroupsLoading,
      joinRequestsOrders: joinRequestsOrdersLoading,
      joinRequestsReceived: joinRequestsReceivedLoading,
    },

    // Refetchers
    refetchGeneralGroups,
    refetchOwnerGroups,
    refetchMemberGroups,
    refetchJoinRequestsOrders,
    refetchJoinRequestsReceived,
  };
};
