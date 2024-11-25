import { useEffect, useState } from "react";
import { apiGroups } from "../api/axiosConfig";

export const useGroupData = (type = "all") => {  // Agora aceitamos um parâmetro `type`
  const [groups, setGroups] = useState([]);
  
  const fetchGroups = async () => {
    try {
      let response;
      
      // Definimos o endpoint baseado no `type` que é passado
      switch(type) {
        case "owner":
          response = await apiGroups.listGroupsOwner();  // Novo endpoint
          break;
        case "member":
          response = await apiGroups.listGroupsMember();  // Novo endpoint
          break;
        case "authorities":
          response = await apiGroups.listGroupsAuthorities();  // Novo endpoint
          break;
        case "search":
          response = await apiGroups.listGroupsSearch();  // Novo endpoint
          break;
        default:
          response = await apiGroups.listGroups();  // Endpoint padrão
      }
      
      setGroups(response.data);
    } catch (error) {
      console.error("Erro ao listar grupos", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [type]);  // Alterado para reagir à mudança no tipo de grupo

  return { groups, fetchGroups };
};
