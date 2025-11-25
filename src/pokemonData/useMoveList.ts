import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoveDetails } from "../types";

export function useMoveList(nameOrId?: string | number) {
  return useQuery({
    queryKey: ["moveList", nameOrId],
    queryFn: async () => {
      const res = await axios.get<MoveDetails>(`https://pokeapi.co/api/v2/move/${nameOrId}`);

      return res.data.learned_by_pokemon.map((pokemonNameURL) => {
        return pokemonNameURL.name
      });
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!nameOrId,
  });
}