import { EvolutionDetails } from "../types";
import {
  findEvoInfoFromChain,
  getFormattedEvoInfo,
  mapEvoInfo,
} from "../utils";
import useChainSpeciesInfo from "../hooks/useChainSpeciesInfo";
import EvolutionChainLink from "./EvolutionChainLink";

interface Props {
  evoData: EvolutionDetails;
  name: string;
}

const EvolutionChain = ({ evoData, name }: Props) => {
  const evoChainInfo = findEvoInfoFromChain(evoData);
  const responses = useChainSpeciesInfo(evoChainInfo.flat());
  if (!responses.every((resp) => !!resp.data)) {
    return null;
  }
  const speciesData = responses.map((resp) => resp.data!);
  const cleansedData = mapEvoInfo(evoChainInfo, name);
  const formattedEvoInfo = getFormattedEvoInfo(cleansedData);

  return (
    <div className="text-gray-900 mt-5">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Evolution Chain</h3>
      {formattedEvoInfo.map((linkInfo, i) => {
        const shouldScroll = linkInfo.length > 2;
        return (
          <div
            className={`w-full flex ${
              shouldScroll ? "overflow-x-auto" : ""
            } scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 my-4`}
            style={{
              justifyContent: "safe center",
            }}
            key={linkInfo[0].name}
          >
            {linkInfo.map(({ name, details }) => (
              <EvolutionChainLink
                details={details}
                name={name}
                showArrow={!!i}
                speciesData={speciesData}
                key={name}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default EvolutionChain;
