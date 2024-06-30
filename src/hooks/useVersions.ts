import axios from "axios";
import { FlavorText, VersionDetails } from "../types";
import { useQueries } from "@tanstack/react-query";

const useVersions = (flavorTexts?: FlavorText[]) => {
  return useQueries({
    queries: (flavorTexts ?? []).map((flavorText) => ({
      queryKey: ["gameVersion", flavorText.version.name],
      queryFn: fetchVersion(flavorText.version.url),
    })),
  })
}

const fetchVersion = (url: string) => async () => {
  const response = await axios.get<VersionDetails>(url);
  return response.data;
};

export default useVersions;