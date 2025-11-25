import useCards from "../pokemonData/useCards";
import { MoveDetails } from "../types";
import CardContainer from "./CardContainer";
import LoadingSnom from "./LoadingSnom";

interface Props {
  data: MoveDetails;
}
const MovePokemonSection = ({ data }: Props) => {
  const {
    cards,
    fetchNextPage,
    filteredCount,
    hasNextPage,
    isFetching,
    isLoading,
  } = useCards({
    move: data.name,
  });

  if (isLoading) {
    return <LoadingSnom />;
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <h3 className="text-3xl sm:text-4xl md:text:5xl">Learned By</h3>
      <h6 className="text-xl sm:text-2xl md:text:3xl mb-4">
        Count: {filteredCount}
      </h6>
      <CardContainer
        cards={cards}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
      />
    </div>
  );
};

export default MovePokemonSection;
