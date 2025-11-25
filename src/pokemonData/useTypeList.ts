import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { TypeDetails } from "../types";

/**
 * Fetches Pokémon names for one or more types.
 * @param types Array of type names (e.g., ["fire", "flying"])
 */
export const useTypeList = (types: string[] = []) => {
  const typeQueries = useQueries({
    queries: types.map((typeName) => ({
      queryKey: ["typeList", typeName],
      queryFn: async () => {
        const response = await axios.get<TypeDetails>(`https://pokeapi.co/api/v2/type/${typeName}`);
        // Return an array of Pokémon names for this type
        return response.data.pokemon.map((entry) => entry.pokemon.name);
      },
      staleTime: Infinity,
    })),
  });

  // Combine all Pokémon names into one deduplicated array
  const combinedPokemonNames = typeQueries
    .filter((query) => query.data)
    .flatMap((query) => query.data!)
    .filter((name, index, array) => array.indexOf(name) === index);

  // Determine loading state
  const isLoading = typeQueries.some((query) => query.isLoading);

  return { data: combinedPokemonNames, isLoading };
};