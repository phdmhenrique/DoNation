import { useState, useCallback, useRef } from "react";
import { apiGroups } from "../api/axiosConfig";

export const useTabsData = () => {
  const dataLoadedRefToMyGroups = useRef({ owner: false, member: false });
  const dataLoadedRefToMyRequests = useRef({ orders: false, receiveds: false });
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

  const fetchMyGroups = useCallback(async (filter) => {
    if (!filter || dataLoadedRefToMyGroups.current[filter]) return;
   
    setLoading(true);

    try {
      const { data } =
        filter === "owner"
          ? await apiGroups.listGroupsOwner()
          : await apiGroups.listGroupsMember(); 
      setMyGroups((prev) => ({ ...prev, [filter]: data || [] }));
      dataLoadedRefToMyGroups.current[filter] = true; 
    } catch (error) {
      console.error(`Erro ao buscar grupos (${filter}):`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJoinRequests = useCallback(async (filter) => {
    if (!filter || dataLoadedRefToMyRequests.current[filter]) return;
   
    setLoading(true);

    try {
      const { data } =
        filter === "orders"
          ? await apiGroups.listGroupsJoinRequestsByMe()
          : await apiGroups.listGroupsJoinRequestsToOwner(); 
      setJoinRequests((prev) => ({ ...prev, [filter]: data || [] }));
      dataLoadedRefToMyRequests.current[filter] = true; 
    } catch (error) {
      console.error(`Erro ao buscar solicitações (${filter}):`, error);
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
