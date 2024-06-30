import PokemonCard from "./PokemonCard";
import { Card } from "../types";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

interface Props {
  cards: Card[];
}

const CardContainer = ({ cards }: Props) => {
  const increment = 20;
  const [filteredCards, setFilteredCards] = useState(cards.slice(0, increment));

  const ref = useRef<HTMLElement>(null);
  const { ref: lastCardRef, entry } = useIntersection({
    root: ref.current,
    threshold: 0.5,
  });

  useEffect(() => {
    setFilteredCards(cards.slice(0, increment));
  }, [cards]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setFilteredCards([
        ...filteredCards,
        ...cards.slice(filteredCards.length, filteredCards.length + increment),
      ]);
    }
  }, [entry, cards, filteredCards]);

  return (
    <div className="grid grid-flow-row grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredCards.map((card, i) => (
        <div
          ref={i === filteredCards.length - 1 ? lastCardRef : undefined}
          key={card.number}
        >
          <PokemonCard card={card} key={card.number} />
        </div>
      ))}
    </div>
  );
};

export default CardContainer;
