import axios from "axios";
import { TypeDetails } from "../types";
import { useQuery } from "@tanstack/react-query";

// Also can be an id as well for gathering previous and next type
const useType = (type: string) => {
  return useQuery({
    queryKey: ["types", type],
    queryFn: fetchType(type),
  });
}

const fetchType = (type: string) => async () => {
  const response = await axios.get<TypeDetails>(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data;
};

export default useType;