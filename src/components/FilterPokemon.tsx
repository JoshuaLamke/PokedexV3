import { useEffect, useState } from "react";
import { Card, Filters } from "../types";
import Search from "./Search";
import AdvancedSearch from "./AdvancedSearch";
import { omit } from "lodash";
import { regions } from "../utils";

interface Props {
  setCards: React.Dispatch<React.SetStateAction<Card[] | undefined>>;
  originalCards: Card[];
}

const FilterPokemon = ({ originalCards, setCards }: Props) => {
  const [filters, setFilters] = useState<Filters>({
    regions: "",
    number: "",
    types: "",
    name: "",
  });

  useEffect(() => {
    const filterRegions: number[][] | undefined = filters.regions
      ? filters.regions
          .split(",")
          .map((reg) => regions[reg as keyof typeof regions])
      : undefined;
    const types = filters.types.split(",");
    const filteredCards = originalCards.filter((card) => {
      if (
        filterRegions &&
        filterRegions.every(
          (reg) => card.number < reg[0] || card.number > reg[1]
        )
      ) {
        return false;
      } else if (
        filters.number &&
        !String(card.number).includes(filters.number)
      ) {
        return false;
      } else if (filters.name && !card.name.includes(filters.name)) {
        return false;
      } else if (
        types[0] &&
        !types.some((type) => card.types.includes(type.toLowerCase()))
      ) {
        return false;
      }
      return true;
    });
    setCards(filteredCards);
  }, [filters, setCards, originalCards]);

  return (
    <>
      <Search setFilters={setFilters} name={filters.name} />
      <AdvancedSearch
        setFilters={setFilters}
        filters={omit(filters, ["name"])}
      />
    </>
  );
};

export default FilterPokemon;
