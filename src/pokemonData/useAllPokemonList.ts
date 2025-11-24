import { useQuery } from "@tanstack/react-query";
import { NameUrl } from "../types";
import axios from "axios";

export function useAllPokemonList() {
  return useQuery({
    queryKey: ["pokemonList"],
    queryFn: async () => {
      const res = await axios.get<{results: NameUrl[]}>("https://pokeapi.co/api/v2/pokemon?limit=20000");

      return res.data.results.map((pokemonNameURL) => {
        const id = Number(pokemonNameURL.url.split("/").slice(-2)[0]);
        return { 
          name: pokemonNameURL.name, 
          id 
        };
      });
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
}