import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useCards from "./useCards";
import { Card } from "../types";

const useCacheCardObjs = () => {
  const queryClient = useQueryClient();
  const { data: cards } = useCards();

  useEffect(() => {
    if (cards) {
      const lastCard = cards[cards.length - 1];
      const nameCardObj = cards.reduce((acc, card) => {
        acc[card.name] = card;
        return acc;
      }, {} as Record<string, Card>);

      const idCardObj = cards.reduce((acc, card) => {
        acc[card.number] = card;
        return acc;
      }, {} as Record<string, Card>);

      queryClient.setQueryData(["nameCardObj"], nameCardObj);
      queryClient.setQueryData(["idCardObj"], idCardObj);
      queryClient.setQueryData(["lastCard"], lastCard);
    }
  }, [cards, queryClient]);
};

export default useCacheCardObjs;