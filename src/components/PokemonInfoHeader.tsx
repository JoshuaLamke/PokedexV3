import { Card, PokemonInfo, SpeciesDetails } from "../types";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import Select from "./Select";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import { getImageURLFromInfoObj, typeColors } from "../utils";
import capitalize from "lodash/capitalize";
import startCase from "lodash/startCase";
import { useEffect } from "react";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";
import { useLocation } from "react-router-dom";
import { usePokemonDetail } from "../pokemonData/usePokemonDetail";

interface Props {
  pokemonData: PokemonInfo;
  speciesData: SpeciesDetails;
  setFlavText: React.Dispatch<React.SetStateAction<string>>;
  setVersion: React.Dispatch<React.SetStateAction<string>>;
  pokemonList: { name: string; id: number }[];
}

const PokemonInfoHeader = ({
  pokemonData,
  speciesData,
  setFlavText,
  setVersion,
  pokemonList,
}: Props) => {
  const handleNavigate = useNavigateSmooth();
  const location = useLocation();

  const engTextEntries = speciesData.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );

  const versionMap = engTextEntries.reduce((acc, curr) => {
    return {
      ...acc,
      [startCase(curr.version.name)]: {
        flavText: curr.flavor_text,
        version: curr.version.name,
      },
    };
  }, {} as Record<string, { flavText: string; version: string }>);

  useEffect(() => {
    setFlavText(engTextEntries[0].flavor_text);
    setVersion(engTextEntries[0].version.name);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pokemonIndex =
    pokemonList.findIndex((pokemon) => pokemon.id === pokemonData.id) ?? 0;
  const prevPokemonIndex =
    pokemonIndex - 1 < 0 ? pokemonList.length - 1 : pokemonIndex - 1;
  const nextPokemonIndex =
    pokemonIndex + 1 >= pokemonList.length ? 0 : pokemonIndex + 1;

  const { data: prevPokemon } = usePokemonDetail(
    pokemonList[prevPokemonIndex].id
  );

  const { data: nextPokemon } = usePokemonDetail(
    pokemonList[nextPokemonIndex].id
  );

  if (!prevPokemon || !nextPokemon) {
    return null;
  }

  const prevPokemonCard: Card = {
    name: prevPokemon.name,
    number: prevPokemon.id,
    order: prevPokemon.order,
    types: prevPokemon.types.map((type) => type.type.name),
    image: getImageURLFromInfoObj(prevPokemon),
  };

  const nextPokemonCard: Card = {
    name: nextPokemon.name,
    number: nextPokemon.id,
    order: nextPokemon.order,
    types: nextPokemon.types.map((type) => type.type.name),
    image: getImageURLFromInfoObj(nextPokemon),
  };

  return (
    <div className="mb-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 p-4 border-b-gray-300 border-b mb-4">
        <div className="order-1 sm:order-2 mb-2 flex justify-center col-span-2 sm:col-span-1">
          {engTextEntries.length ? (
            <Select
              label="Game Version"
              onChange={(version) => {
                setFlavText(versionMap[version].flavText);
                setVersion(versionMap[version].version);
              }}
              defaultValue={startCase(engTextEntries[0].version.name)}
              options={Object.keys(versionMap)}
            />
          ) : (
            <></>
          )}
        </div>
        <button
          className="text-white rounded-md text-sm xs:text-xl flex items-end order-2 sm:order-1 w-fit"
          style={{
            color: typeColors[capitalize(prevPokemonCard.types[0])],
          }}
          onClick={handleNavigate(`/pokemon/${prevPokemonCard.name}`, {
            name: startCase(prevPokemonCard.name),
            path: `/pokemon/${prevPokemonCard.name}`,
          })}
        >
          <div className="flex items-center">
            <TbPlayerTrackPrevFilled
              color={typeColors[capitalize(prevPokemonCard.types[0])]}
              className="mr-2 size-3 xs:size-5"
            />
            <div className="mb-1">
              {startCase(prevPokemonCard.name).split(" ")[0]}
            </div>
          </div>
        </button>
        <div className="order-3 flex justify-end">
          <button
            className="text-white rounded-md text-sm xs:text-xl flex items-end w-fit"
            onClick={handleNavigate(`/pokemon/${nextPokemonCard.name}`, {
              name: startCase(nextPokemonCard.name),
              path: `/pokemon/${nextPokemonCard.name}`,
            })}
            style={{
              color: typeColors[capitalize(nextPokemonCard.types[0])],
            }}
          >
            <div className="flex items-center">
              <div className="mb-1">
                {startCase(nextPokemonCard.name).split(" ")[0]}
              </div>
              <TbPlayerTrackNextFilled
                color={typeColors[capitalize(nextPokemonCard.types[0])]}
                className="ml-2 size-3 xs:size-5"
              />
            </div>
          </button>
        </div>
      </div>
      {location.state?.crumbs && (
        <Breadcrumbs crumbs={location.state.crumbs as Breadcrumb[]} />
      )}
    </div>
  );
};

export default PokemonInfoHeader;
