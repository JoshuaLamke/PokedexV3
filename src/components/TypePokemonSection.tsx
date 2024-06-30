import startCase from "lodash/startCase";
import useCacheCardObjs from "../hooks/useCacheCardObjs";
import useCardObjs from "../hooks/useCardObjs";
import { TypeDetails } from "../types";
import CardContainer from "./CardContainer";

interface Props {
  data: TypeDetails;
}
const TypePokemonSection = ({ data }: Props) => {
  useCacheCardObjs();
  const { byName } = useCardObjs();
  if (!byName || !data.pokemon?.length) {
    return null;
  }
  const pokemonWithType = data.pokemon.map(
    (pokemon) => byName[pokemon.pokemon.name]
  );

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">
        {startCase(data.name)} Pokemon
      </h3>
      <h6 className="text-xl sm:text-2xl md:text:3xl mb-4">
        Count: {pokemonWithType.length}
      </h6>
      <CardContainer cards={pokemonWithType} />
    </div>
  );
};

export default TypePokemonSection;
