import axios from "axios";
import { EvolutionDetails } from "../types";
import { useQuery } from "@tanstack/react-query";

const useEvoInfo = (url: string | undefined, name: string) => {
  return useQuery({
    queryKey: ["species", name, "evolutionDetails"],
    queryFn: fetchEvoDetails(url!),
    enabled: !!url,
  });
}

const fetchEvoDetails = (url: string) => async () => {
  const response = await axios.get<EvolutionDetails>(url);
  return response.data;
};

export default useEvoInfo;