import CardContainer from "../components/CardContainer";
import { useRef, useState } from "react";
import PokeApi from "../assets/pokeapi.png";
import { POKEMON_TYPES, getImageByType } from "../utils";
import capitalize from "lodash/capitalize";
import startCase from "lodash/startCase";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import { Tooltip } from "react-tooltip";
import useCards, { REGION_RANGES } from "../pokemonData/useCards";
import AdvancedSearch from "../components/AdvancedSearch";
import Search from "../components/Search";
import Spinner from "../components/Spinner";

const Home = () => {
  // Filter State
  const [filters, setFilters] = useState({
    nameQuery: "",
    idQuery: "",
    types: [] as string[],
    regions: [] as (keyof typeof REGION_RANGES)[],
  });

  const {
    cards,
    isLoading,
    filteredCount,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useCards(filters);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleNavigate = useNavigateSmooth();

  const noActiveFilters =
    !filters.idQuery &&
    !filters.nameQuery &&
    filters.regions.length === 0 &&
    filters.types.length === 0;

  const loading = isLoading || isFetching;
  const noResults = !cards.length && !loading && !isFetching;

  return (
    <>
      <div>
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-green-700 py-3">Pokedex!</h1>
          <h3 className="text-gray-700 text-xl">Created By Joshua Lamke</h3>
          <div className="w-full flex items-center justify-center mb-10">
            <h3 className="text-yellow-700 text-xl mr-2">Powered By: </h3>
            <img src={PokeApi} alt="Pokeapi" className="h-5 w-auto" />
          </div>
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl flex mb-4">Types</h2>
          </div>
          <div className="flex flex-wrap justify-center pb-2 border-b-2 border-black">
            {POKEMON_TYPES.map((type) => (
              <div
                className="max-w-36 xs:max-w-40 sm:max-w-44 m-2 sm:m-4 hover:animate-shake hover:scale-105"
                role="button"
                onClick={handleNavigate(`/types/${type}`, {
                  name: startCase(type),
                  path: `/types/${type}`,
                })}
                key={type}
                data-tooltip-id={startCase(type)}
                data-tooltip-content={startCase(type)}
              >
                <img
                  src={getImageByType(capitalize(type))}
                  alt={type}
                  className="w-14 h-auto"
                />
                <Tooltip id={startCase(type)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-center items-center">
        <Search
          setFilters={setFilters}
          nameQuery={filters.nameQuery}
          inputRef={searchInputRef}
        />
        <AdvancedSearch setFilters={setFilters} filters={filters} />
      </div>

      {/* Cards */}
      {!!cards.length && (
        <CardContainer
          cards={cards}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isLoading={isLoading}
        />
      )}

      {/* Spinner (loading initial page OR loading more pages) */}
      {loading && (
        <div className="w-full flex justify-center my-3">
          <Spinner />
        </div>
      )}

      {/* No results WITH filters */}
      {noResults && !noActiveFilters && (
        <h1 className="text-3xl text-green-700 w-full text-center">
          No Pokémon found ({filteredCount} matches)
        </h1>
      )}

      {/* No Pokémon on initial load (no filters, nothing returned) */}
      {noResults && noActiveFilters && (
        <div className="flex p-4 justify-center items-center">
          <h1 className="text-4xl font-bold text-green-700">No Pokemon :(</h1>
        </div>
      )}
    </>
  );
};

export default Home;
