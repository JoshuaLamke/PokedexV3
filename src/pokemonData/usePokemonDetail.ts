import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonInfo } from "../types";

export function usePokemonDetail(nameOrId?: string | number) {
  return useQuery({
    queryKey: ["pokemon", nameOrId],
    queryFn: pokemonDetailQueryFn(nameOrId!),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!nameOrId,
  });
}

export function pokemonDetailQueryFn(nameOrId: string | number) {
  return async () => {
    const res = await axios.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
    return res.data;
  }
}