import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card } from "../types";

const useCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: queryCards,
  });
}

export const queryCards = async () => {
  const response = await axios.get<{data: Card[]}>(`${process.env.VITE_API_GATEWAY_URL}/cards`);
  return response.data.data.sort((cardA, cardB) => cardA.number - cardB.number);
}

export default useCards;

