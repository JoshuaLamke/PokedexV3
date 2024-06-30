import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PokemonInfo } from "../types";

const usePokemonInfo = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: queryPokemonInfo(name),
  });
}

export const queryPokemonInfo = (name: string) => async () => {
  const response = await axios.get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}

export default usePokemonInfo;

