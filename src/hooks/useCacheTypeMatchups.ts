import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useTypes from "./useTypes";
import { calculateTypeMatchups } from "../utils";

const useCacheTypeMatchups = () => {
  const queryClient = useQueryClient();
  const typeResults = useTypes();

  useEffect(() => {
    const typesLoaded = typeResults.every(query => query.data);
    if (typesLoaded) {
      const types = typeResults.map(query => query.data!);
      const typeMatchups = calculateTypeMatchups(types);
      queryClient.setQueryData(["typeMatchups"], typeMatchups);
    }
  }, [typeResults, queryClient]);
};

export default useCacheTypeMatchups;