import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoveDetails } from "../types";

// Also can be an id as well for gathering previous and next move
const useMove = (name: string) => {
  return useQuery({
    queryKey: ["move", name],
    queryFn: queryMove(name),
  });
}

export const queryMove = (name: string) => async () => {
  try{
    const response = await axios.get<MoveDetails>(`https://pokeapi.co/api/v2/move/${name}`);
    return response.data;
  } catch(e) {
    return null;
  }
}

export default useMove;
