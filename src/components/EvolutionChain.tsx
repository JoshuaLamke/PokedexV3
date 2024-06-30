import { FaArrowDownLong } from "react-icons/fa6";
import { Card, EvolutionDetails } from "../types";
import startCase from "lodash/startCase";
import {
  findEvoInfoFromChain,
  getFormattedEvoInfo,
  mapEvoInfo,
  typeColors,
} from "../utils";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import NotFound from "../assets/404_error.svg";
import useChainSpeciesInfo from "../hooks/useChainSpeciesInfo";

interface Props {
  evoData: EvolutionDetails;
  nameCardObj: Record<string, Card>;
  idCardObj: Record<string, Card>;
  name: string;
}

const EvolutionChain = ({ evoData, nameCardObj, idCardObj, name }: Props) => {
  const evoChainInfo = findEvoInfoFromChain(evoData);
  const responses = useChainSpeciesInfo(evoChainInfo.flat());
  const handleNavigate = useNavigateSmooth();
  if (!responses.every((resp) => !!resp.data)) {
    return null;
  }
  const speciesData = responses.map((resp) => resp.data);
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
            {linkInfo.map(({ name, details }) => {
              const imgFromPokemon = nameCardObj[name]?.image;
              const pokemonFromspecies =
                idCardObj[
                  String(speciesData.find((data) => data?.name === name)?.id)
                ];

              const cardImg = imgFromPokemon ?? pokemonFromspecies?.image;
              const pokemonName =
                !imgFromPokemon && pokemonFromspecies
                  ? pokemonFromspecies.name
                  : name;

              return (
                <div
                  key={name}
                  className="group flex flex-col items-center mx-2 sm:mx-4 w-28 xs:w-32 sm:w-40"
                >
                  <div className="flex-grow my-2">{details}</div>
                  {!!i && (
                    <FaArrowDownLong
                      size={40}
                      className="mb-2 group-hover:translate-y-2"
                    />
                  )}
                  <button
                    onClick={handleNavigate(`/pokemon/${pokemonName}`, {
                      name: startCase(pokemonName),
                      path: `/pokemon/${pokemonName}`,
                    })}
                    disabled={!cardImg}
                    className="hover:scale-105 disabled:scale-100"
                  >
                    <img
                      src={cardImg ?? NotFound}
                      className="w-28 xs:w-32 sm:w-40 h-auto"
                      alt={pokemonName}
                    />
                  </button>
                  <p
                    className="text-xl"
                    style={{
                      color:
                        typeColors[
                          startCase(
                            nameCardObj[pokemonName]?.types?.[0] ??
                              pokemonFromspecies?.types?.[0]
                          )
                        ],
                    }}
                  >
                    {startCase(pokemonName)}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default EvolutionChain;
