import axios from "axios";
import { SpeciesDetails } from "../types";
import { useQuery } from "@tanstack/react-query";

const useSpeciesInfo = (url: string | undefined, name: string) => {
  return useQuery({
    queryKey: ["species", name],
    queryFn: fetchSpeciesDetails(url!),
    enabled: !!url,
  });
}

const fetchSpeciesDetails = (url: string) => async () => {
  const response = await axios.get<SpeciesDetails>(url);
  return response.data;
};

export default useSpeciesInfo;