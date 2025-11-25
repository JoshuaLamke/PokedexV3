import { FaArrowDownLong } from "react-icons/fa6";
import startCase from "lodash/startCase";
import { usePokemonDetail } from "../pokemonData/usePokemonDetail";
import NotFound from "../assets/404_error.svg";
import { getImageURLFromInfoObj, typeColors } from "../utils";
import { SpeciesDetails } from "../types";
import useNavigateSmooth from "../hooks/useNavigateSmooth";

interface EvolutionChainLinkProps {
  name: string;
  details: JSX.Element | null;
  showArrow: boolean;
  speciesData: SpeciesDetails[];
}

const EvolutionChainLink = ({
  name,
  details,
  showArrow,
  speciesData,
}: EvolutionChainLinkProps) => {
  const handleNavigate = useNavigateSmooth();

  const { data: pokemonData } = usePokemonDetail(name);
  const { data: speciesPokemonData } = usePokemonDetail(
    speciesData.find((species) => species.name === name)?.name
  );

  const primaryType =
    pokemonData?.types[0].type.name || speciesPokemonData?.types[0].type.name;
  const displayName = startCase(name);
  const pokemonImage = pokemonData ? getImageURLFromInfoObj(pokemonData) : "";
  const speciesImage = speciesPokemonData
    ? getImageURLFromInfoObj(speciesPokemonData)
    : "";
  const displayImage = pokemonImage || speciesImage;

  return (
    <div className="group flex flex-col items-center mx-2 sm:mx-4 w-28 xs:w-32 sm:w-40">
      <div className="flex-grow my-2">{details}</div>

      {showArrow && (
        <FaArrowDownLong size={40} className="mb-2 group-hover:translate-y-2" />
      )}

      <button
        onClick={handleNavigate(`/pokemon/${name}`, {
          name: displayName,
          path: `/pokemon/${name}`,
        })}
        disabled={!displayImage}
        className="hover:scale-105 disabled:scale-100"
      >
        <img
          src={displayImage || NotFound}
          className="w-28 xs:w-32 sm:w-40 h-auto"
          alt={displayName}
        />
      </button>

      <p
        className="text-xl"
        style={{
          color: typeColors[startCase(primaryType ?? "")],
        }}
      >
        {displayName}
      </p>
    </div>
  );
};

export default EvolutionChainLink;
