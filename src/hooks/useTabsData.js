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

export const useTabsData = (activeTab, selectedFilterToMyGroups, selectedFilterToMyRequests) => {
  // Grupos Gerais
  const {
    data: generalGroups = [],
    isLoading: generalGroupsLoading,
    mutate: mutateGeneralGroups,
  } = useSWR(activeTab === 0 ? "generalGroups" : null, fetcher);

  // Meus Grupos
  const {
    data: ownerGroups = [],
    isLoading: ownerGroupsLoading,
    mutate: mutateOwnerGroups,
  } = useSWR(activeTab === 1 && selectedFilterToMyGroups === "owner" ? ["myGroups", "owner"] : null, ([url, filter]) => fetcher(url, filter));

  const {
    data: memberGroups = [],
    isLoading: memberGroupsLoading,
    mutate: mutateMemberGroups,
  } = useSWR(activeTab === 1 && selectedFilterToMyGroups === "member" ? ["myGroups", "member"] : null, ([url, filter]) => fetcher(url, filter));

  // Solicitações
  const {
    data: joinRequestsOrders = [],
    isLoading: joinRequestsOrdersLoading,
    mutate: mutateJoinRequestsOrders,
  } = useSWR(activeTab === 2 && selectedFilterToMyRequests === "orders" ? ["joinRequests", "orders"] : null, ([url, filter]) => fetcher(url, filter));

  const {
    data: joinRequestsReceived = [],
    isLoading: joinRequestsReceivedLoading,
    mutate: mutateJoinRequestsReceived,
  } = useSWR(activeTab === 2 && selectedFilterToMyRequests === "receiveds" ? ["joinRequests", "receiveds"] : null, ([url, filter]) => fetcher(url, filter));

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

