import { useState, useCallback } from "react";
import { apiGroups } from "../api/axiosConfig";

export const useTabsData = () => {
  const [generalGroups, setGeneralGroups] = useState([]);
  const [myGroups, setMyGroups] = useState({ owner: [], member: [] });
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGeneralGroups = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiGroups.listGroupsSearch();
      setGeneralGroups(data || []);
    } catch (error) {
      console.error("Erro ao buscar grupos gerais:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyGroups = useCallback(async () => {
    setLoading(true);
    try {
      const [ownerResponse, memberResponse] = await Promise.all([
        apiGroups.listGroupsOwner(),
        apiGroups.listGroupsMember(),
      ]);
      setMyGroups({
        owner: ownerResponse.data || [],
        member: memberResponse.data || [],
      });
    } catch (error) {
      console.error("Erro ao buscar meus grupos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJoinRequests = useCallback(async (groupName) => {
    if (!groupName) return;
    setLoading(true);
    try {
      const { data } = await apiGroups.listGroupsJoinRequest(groupName);
      setJoinRequests(data || []);
    } catch (error) {
      console.error("Erro ao buscar solicitações de grupo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generalGroups,
    myGroups,
    joinRequests,
    loading,
    fetchGeneralGroups,
    fetchMyGroups,
    fetchJoinRequests,
  };
};
