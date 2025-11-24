import PokemonCard from "./PokemonCard";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { Card } from "../types";

interface Props {
  cards: Card[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
}

const CardContainer = ({
  cards,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: Props) => {
  const ref = useRef<HTMLElement>(null);

  // Intersection observer for infinite scroll
  const { ref: lastCardRef, entry } = useIntersection({
    root: ref.current,
    threshold: 0.5,
  });

  // Fetch next page when last card intersects
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetching && cards.length) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetching, fetchNextPage, cards]);

  if (!cards.length) {
    return (
      <h1 className="text-3xl text-green-700 w-full text-center">
        No Pokémon found.
      </h1>
    );
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[500px]">
      {cards.map((card, index) => (
        <div
          key={card.number}
          ref={index === cards.length - 1 ? lastCardRef : undefined}
        >
          <PokemonCard card={card} />
        </div>
      ))}
      {isFetching && (
        <div className="col-span-full text-center py-4 text-gray-700">
          Loading more Pokémon...
        </div>
      )}
    </div>
  );
};

export default CardContainer;
