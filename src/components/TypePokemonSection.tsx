import startCase from "lodash/startCase";
import { TypeDetails } from "../types";
import CardContainer from "./CardContainer";
import useCards from "../pokemonData/useCards";

interface Props {
  data: TypeDetails;
}
const TypePokemonSection = ({ data }: Props) => {
  const {
    cards,
    fetchNextPage,
    hasNextPage,
    isFetching,
    filteredCount,
    isLoading,
  } = useCards({
    types: [data.name],
  });

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">
        {startCase(data.name)} Pokemon
      </h3>
      <h6 className="text-xl sm:text-2xl md:text:3xl mb-4">
        Count: {filteredCount}
      </h6>
      <CardContainer
        cards={cards}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TypePokemonSection;
