import useCacheCardObjs from "../hooks/useCacheCardObjs";
import useCardObjs from "../hooks/useCardObjs";
import { MoveDetails } from "../types";
// import CardContainer from "./CardContainer";

interface Props {
  data: MoveDetails;
}
const MovePokemonSection = ({ data }: Props) => {
  useCacheCardObjs();
  const { byName } = useCardObjs();
  if (!byName) {
    return null;
  }
  const pokemonWithMove = data.learned_by_pokemon.map(
    (pokemon) => byName[pokemon.name]
  );

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Learned By</h3>
      <h6 className="text-xl sm:text-2xl md:text:3xl mb-4">
        Count: {pokemonWithMove.length}
      </h6>
      <h6>Coming soon</h6>
      {/* <CardContainer cards={pokemonWithMove} /> */}
    </div>
  );
};

export default MovePokemonSection;
