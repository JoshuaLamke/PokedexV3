import { Card, PokemonInfo, SpeciesDetails } from "../types";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import Select from "./Select";
import useNavigateSmooth from "../hooks/useNavigateSmooth";
import { typeColors } from "../utils";
import capitalize from "lodash/capitalize";
import startCase from "lodash/startCase";
import { useEffect } from "react";
import Breadcrumbs, { Breadcrumb } from "./Breadcrumbs";
import { useLocation } from "react-router-dom";

interface Props {
  cardData: Card[];
  pokemonData: PokemonInfo;
  speciesData: SpeciesDetails;
  setFlavText: React.Dispatch<React.SetStateAction<string>>;
  setVersion: React.Dispatch<React.SetStateAction<string>>;
}

const PokemonInfoHeader = ({
  cardData,
  pokemonData,
  speciesData,
  setFlavText,
  setVersion,
}: Props) => {
  const handleNavigate = useNavigateSmooth();
  const location = useLocation();
  const cardIndex = cardData.findIndex(
    (card) => card.number === pokemonData.id
  );
  const prevCard = cardData[cardIndex - 1]
    ? cardData[cardIndex - 1]
    : cardData[cardData.length - 1];
  const nextCard = cardData[cardIndex + 1]
    ? cardData[cardIndex + 1]
    : cardData[0];

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
            color: typeColors[capitalize(prevCard.types[0])],
          }}
          onClick={handleNavigate(`/pokemon/${prevCard.name}`, {
            name: startCase(prevCard.name),
            path: `/pokemon/${prevCard.name}`,
          })}
        >
          <div className="flex items-center">
            <TbPlayerTrackPrevFilled
              color={typeColors[capitalize(prevCard.types[0])]}
              className="mr-2 size-3 xs:size-5"
            />
            <div className="mb-1">{startCase(prevCard.name).split(" ")[0]}</div>
          </div>
        </button>
        <div className="order-3 flex justify-end">
          <button
            className="text-white rounded-md text-sm xs:text-xl flex items-end w-fit"
            onClick={handleNavigate(`/pokemon/${nextCard.name}`, {
              name: startCase(nextCard.name),
              path: `/pokemon/${nextCard.name}`,
            })}
            style={{
              color: typeColors[capitalize(nextCard.types[0])],
            }}
          >
            <div className="flex items-center">
              <div className="mb-1">
                {startCase(nextCard.name).split(" ")[0]}
              </div>
              <TbPlayerTrackNextFilled
                color={typeColors[capitalize(nextCard.types[0])]}
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
