import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAllPokemonList } from "./useAllPokemonList";
import { useTypeList } from "./useTypeList";
import { pokemonDetailQueryFn } from "./usePokemonDetail";
import { Card } from "../types";
import { getImageURLFromInfoObj } from "../utils";

export const REGION_RANGES = {
  "Kanto (1 - 151)": [1, 151],
  "Johto (152 - 251)": [152, 251],
  "Hoenn (252 - 386)": [252, 386],
  "Sinnoh (387 - 494)": [387, 494],
  "Unova (495 - 649)": [495, 649],
  "Kalos (650 - 721)": [650, 721],
  "Alola (722 - 809)": [722, 809],
  "Galar (810 - 898)": [810, 898],
  "Paldea (899 - 1025)": [899, 1025],
};

export default function useCards(filters: {
  nameQuery?: string;
  idQuery?: string;
  types?: string[];
  regions?: (keyof typeof REGION_RANGES)[];
}) {
  const queryClient = useQueryClient();
  const { data: allPokemon } = useAllPokemonList();

  // Fetch Pokémon names for selected types (supports multiple types)
  const { data: typeFilteredNames, isLoading: typeNamesLoading } = useTypeList(filters.types || []);

  const filteredList = useMemo(() => {
    if (!allPokemon) return [];

    let result = allPokemon;

    // ID filter
    if (filters.idQuery) {
      const id = Number(filters.idQuery);
      if (!isNaN(id)) {
        result = result.filter(p => String(p.id).includes(filters.idQuery!))
      }
    }

    // Name filter (debounced)
    if (filters.nameQuery) {
      result = result.filter(p => p.name.includes(filters.nameQuery!));
    }

    // Types Filter
    if (filters.types?.length && !typeNamesLoading && typeFilteredNames) {
      result = result.filter((pokemon) => typeFilteredNames.includes(pokemon.name));
    }

    // Regions filter
    if (filters.regions?.length) {
      result = result.filter((pokemon) =>
        filters.regions!.some((regionKey) => {
          const [minId, maxId] = REGION_RANGES[regionKey];
          return pokemon.id >= minId && pokemon.id <= maxId;
        })
      );
    }

    return result;
  }, [allPokemon, filters.nameQuery, filters.idQuery, filters.types, filters.regions, typeFilteredNames, typeNamesLoading]);

  const filteredNamesKey = useMemo(
    () => filteredList.map(p => p.name).join(","), // stable string
    [filteredList]
  );
  
  // infinite query for details 20 at a time
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["cards", filteredNamesKey],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const slice = filteredList.slice(pageParam, pageParam + 20);

      const detailed = await Promise.all(
        slice.map(p =>
          queryClient.fetchQuery({
            queryKey: ["pokemon", p.id],
            queryFn: pokemonDetailQueryFn(p.id),
            staleTime: Infinity,
          })
        )
      );

      return { items: detailed, nextOffset: pageParam + 20 };
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset >= filteredList.length ? undefined : lastPage.nextOffset,
    enabled: !!allPokemon,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const pokemonInfoList = data?.pages.flatMap(p => p.items) ?? [];
  const cards = pokemonInfoList.map((pokemonInfo): Card => {
    return {
      name: pokemonInfo.name,
      number: pokemonInfo.id,
      order: pokemonInfo.order,
      types: pokemonInfo.types.map(type => type.type.name),
      image: getImageURLFromInfoObj(pokemonInfo),
    }
  })

  return {
    cards,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    filteredCount: filteredList.length,
  };
}
