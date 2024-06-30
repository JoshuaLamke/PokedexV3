import axios from "axios";
import { SpeciesDetails } from "../types";
import { useQueries } from "@tanstack/react-query";

const useChainSpeciesInfo = (links: {name: string; speciesURL: string}[]) => {
  return useQueries({
    queries: links.map(({name, speciesURL}) => ({
      queryKey: ["species", name],
      queryFn: fetchSpeciesDetails(speciesURL),
    }))
  });
}

const fetchSpeciesDetails = (url: string) => async () => {
  const response = await axios.get<SpeciesDetails>(url);
  return response.data;
};

export default useChainSpeciesInfo;