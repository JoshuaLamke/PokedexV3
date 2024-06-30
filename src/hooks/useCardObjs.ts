import { useQueryClient } from "@tanstack/react-query";
import { Card } from "../types";

const useCardObjs = () => {
  const queryClient = useQueryClient();
  return {
    byName: queryClient.getQueryData<Record<string, Card>>(["nameCardObj"]),
    byId: queryClient.getQueryData<Record<string, Card>>(["idCardObj"]),
    lastCard:  queryClient.getQueryData<Card>(["lastCard"]),
  };
};

export default useCardObjs;