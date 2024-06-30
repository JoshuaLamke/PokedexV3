import { useQueryClient } from "@tanstack/react-query";
import { TypeEffectivenessMap } from "../types";

const useTypeMatchups = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<TypeEffectivenessMap>(["typeMatchups"]);
};

export default useTypeMatchups;