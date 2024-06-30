import axios from "axios";
import { TypeDetails } from "../types";
import { useQueries } from "@tanstack/react-query";
import { POKEMON_TYPES } from "../utils";


const useTypes = () => {
  return useQueries({
    queries: POKEMON_TYPES.map((type) => ({
      queryKey: ["types", type],
      queryFn: fetchType(type),
    })),
  })
}

const fetchType = (type: string) => async () => {
  const response = await axios.get<TypeDetails>(`https://pokeapi.co/api/v2/type/${type}`);
  return response.data;
};

export default useTypes;