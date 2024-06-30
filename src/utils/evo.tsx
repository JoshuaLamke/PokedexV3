import { EvolutionDetails, EvolutionRequirements } from "../types";
import Sun from "../assets/sun.svg?react";
import Sunset from "../assets/sunset.svg?react";
import Moon from "../assets/moon.svg?react";
import Swap from "../assets/swap.svg?react";
import OR from "../assets/evoReqOr.png";
import startCase from "lodash/startCase";
import EvoReqLink from "../components/EvoReqLink";

export const replaceName = (
  replaceName: string,
  replacementName: string,
  links: {
    name: string;
    details: EvolutionRequirements[];
  }[][]
) => {
  return links.map((link) => {
    if (link.some(({ name }) => name === "wormadam")) {
      const replaceIdx = link.findIndex(({ name }) => name === replaceName);
      link[replaceIdx] = {
        ...link[replaceIdx],
        name: replacementName,
      };
    }
    return link;
  });
};

// For special cases where species name and pokemon name dont match up
export const mapEvoInfo = (
  links: {
    name: string;
    details: EvolutionRequirements[];
  }[][],
  name: string
): {
  name: string;
  details: EvolutionRequirements[] | null;
}[][] => {
  if (links.some((link) => link.some(({ name }) => name === "wormadam"))) {
    return replaceName("wormadam", "wormadam-plant", links);
  }
  if (links.some((link) => link.some(({ name }) => name === "meowstic"))) {
    return [
      [{ name: "espurr", details: null }],
      [
        {
          name: "meowstic-male",
          details: [{ ...links[1][0].details[0], gender: 2 }],
        },
        {
          name: "meowstic-female",
          details: [{ ...links[1][0].details[0], gender: 1 }],
        },
      ],
    ];
  }
  if (
    links.some((link) => link.some(({ name }) => name.includes("lycanroc")))
  ) {
    return [
      [{ name: "rockruff", details: null }],
      [
        {
          name: "lycanroc-dusk",
          details: [{ ...links[1][0].details[0], time_of_day: "dusk" }],
        },
        {
          name: "lycanroc-midday",
          details: [{ ...links[1][0].details[0], time_of_day: "day" }],
        },
        {
          name: "lycanroc-midnight",
          details: [{ ...links[1][0].details[0], time_of_day: "night" }],
        },
      ],
    ];
  }
  if (links.some((link) => link.some(({ name }) => name === "indeedee"))) {
    return [[{ name, details: null }]];
  }
  if (name.includes("bascul")) {
    if (name.includes("white-striped") || name.includes("basculegion")) {
      return [
        [{ name: "basculin-white-striped", details: null }],
        [
          { name: "basculegion-male", details: null },
          { name: "basculegion-female", details: null },
        ],
      ];
    } else {
      return [[{ name, details: null }]];
    }
  }
  return links;
};

export const findEvoInfoFromChain = (evoChain?: EvolutionDetails) => {
  if (!evoChain) {
    return [];
  }
  const evoChainInfo = [];
  const chain = evoChain.chain;
  const queue = [chain];
  while (queue.length) {
    const len = queue.length;
    const linkInfo = [];
    for (let i = 0; i < len; i++) {
      const link = queue.shift()!;
      linkInfo.push({
        name: link.species.name,
        details: link.evolution_details,
        speciesURL: link.species.url,
      });
      if (link.evolves_to.length) {
        queue.push(...link.evolves_to);
      }
    }
    evoChainInfo.push(linkInfo);
  }
  return evoChainInfo;
};

const mapTimeOfDayIcon = (timeOfDay: string): JSX.Element => {
  switch (timeOfDay) {
    case "day":
      return <Sun className="w-9 mt-2" />;
    case "night":
      return <Moon className="w-8 mt-2" />;
    case "dusk":
      return <Sunset className="w-10 mt-2" />;
    default:
      return <></>;
  }
};

const mapPhysicalStats = (
  physical: EvolutionRequirements["relative_physical_stats"]
): string => {
  switch (physical) {
    case 1:
      return "more Attack than Defense";
    case 0:
      return "the same Attack and Defense";
    case -1:
      return "less Attack than Defense";
    default:
      return "";
  }
};

const mapTriggerName = (
  triggerName: string,
  hasTrade: boolean
): string | JSX.Element => {
  switch (triggerName) {
    case "level-up":
      return "Level up";
    case "use-item":
      return "Use";
    case "trade":
      return `Trade ${!hasTrade ? "for any Pokémon" : ""}`;
    case "shed":
      return (
        <>
          <img
            src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
            alt="Rare Candy"
            className="w-9"
          />
          <br />
          Level 20 with PokéBall in bag and open slot in party
        </>
      );
    case "three-critical-hits":
      return "Perform three critical hits.";
    case "tower-of-darkness":
      return "Go to the tower of darkness.";
    case "tower-of-waters":
      return "Go to the tower of waters.";
    case "spin":
      return "Spin and strike a pose.";
    case "take-damage":
      return "Travel to a location after taking damage.";
    case "agile-style-move":
      return "Use agile style move a certain number of times.";
    case "strong-style-move":
      return "Use strong style move a certain number of times.";
    case "recoil-damage":
      return "Take a certain amount of recoil damage.";
    case "other":
      return "Other";
    default:
      return "";
  }
};

const getIdFromSpecies = (url: string) => {
  const regex = /\/(\d+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const getTextFromRequirement = (pokemonRequirement: EvolutionRequirements) => {
  const {
    gender,
    held_item,
    item,
    known_move,
    known_move_type,
    location,
    min_affection,
    min_beauty,
    min_happiness,
    min_level,
    needs_overworld_rain,
    party_species,
    party_type,
    relative_physical_stats,
    time_of_day,
    trade_species,
    trigger,
    turn_upside_down,
  } = pokemonRequirement;

  return (
    <div className="flex-col items-center text-center my-2">
      <div className="flex flex-row justify-center">
        {!!min_level && (
          <img
            src="https://raw.githubusercontent.com/msikma/pokesprite/master/items/medicine/rare-candy.png"
            alt="Rare Candy"
            className="w-9"
          />
        )}
        {trigger?.name === "trade" && <Swap className="w-9" />}
        {trade_species && (
          <img
            className="w-9"
            alt={trade_species.name}
            src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${getIdFromSpecies(
              trade_species.url
            )}.png`}
          />
        )}
        {held_item && (
          <img
            src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/evo-item/${held_item.name}.png`}
            alt={held_item.name}
            className="w-12"
          />
        )}
        {item && (
          <img
            src={`https://raw.githubusercontent.com/msikma/pokesprite/master/items/evo-item/${item.name}.png`}
            alt={item.name}
            className="w-12"
          />
        )}
        {!!time_of_day && mapTimeOfDayIcon(time_of_day)}
      </div>
      {min_level
        ? `Reach level ${min_level}`
        : trigger?.name !== "level-up" &&
          mapTriggerName(trigger?.name, !!trade_species)}
      {location &&
        `${
          trigger?.name && mapTriggerName(trigger?.name, !!trade_species)
        } at ${startCase(location.name)}`}
      {trade_species && (
        <>
          {` for `}
          <EvoReqLink
            path={`/pokemon/${trade_species.name}`}
            name={startCase(trade_species.name)}
          />
        </>
      )}
      {held_item && ` while holding ${startCase(held_item.name)}`}
      {item && ` ${startCase(item.name)}`}
      {known_move && (
        <>
          {` Learn move `}
          <EvoReqLink
            path={`/moves/${known_move.name}`}
            name={startCase(known_move.name)}
          />
        </>
      )}
      {min_happiness && ` Has over ${min_happiness} Happiness. `}
      {min_affection && ` Has over ${min_affection} Affection. `}
      {min_beauty && ` Has over ${min_beauty} Beauty. `}
      {time_of_day !== "" && ` during the ${time_of_day}`}
      {needs_overworld_rain && ` in the rain`}
      {gender && `  (${gender === 1 ? "female" : "male"} only)`}
      {relative_physical_stats !== null &&
        ` having ${mapPhysicalStats(relative_physical_stats)}`}
      {known_move_type && (
        <>
          {` Learn move from `}
          <EvoReqLink
            path={`/types/${known_move_type.name}`}
            name={startCase(known_move_type.name)}
          />
          {` type`}
        </>
      )}
      {party_type && (
        <>
          {` with a Pokémon of type `}
          <EvoReqLink
            path={`/types/${party_type.name}`}
            name={startCase(party_type.name)}
          />
          {` in party`}
        </>
      )}
      {party_species && (
        <>
          {` if there is a `}
          <EvoReqLink
            path={`/pokemon/${party_species.name}`}
            name={startCase(party_species.name)}
          />
          {` in party`}
        </>
      )}
      {turn_upside_down && ` by turning console upside-down`}
    </div>
  );
};

const getTextFromRequirements = (
  pokemonRequirements: EvolutionRequirements[]
) => {
  const sortedRequirements = pokemonRequirements.sort((reqA, reqB) => {
    if (reqA.trigger.name === "use-item" || reqA.trigger.name === "trade") {
      return -1;
    } else if (
      reqB.trigger.name === "use-item" ||
      reqB.trigger.name === "trade"
    ) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      {sortedRequirements.map((pokemonRequirement, i) => (
        <div key={`evo-method-${i}`}>
          {getTextFromRequirement(pokemonRequirement)}
          {i < sortedRequirements.length - 1 && (
            <div className="w-full flex justify-center">
              <img src={OR} alt="or" className="w-4" />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export const getFormattedEvoInfo = (
  evoChainInfo: {
    name: string;
    details: EvolutionRequirements[] | null;
  }[][]
) => {
  return evoChainInfo.map((chainInfo) =>
    chainInfo.map(({ name, details }) => ({
      name,
      details: details ? getTextFromRequirements(details) : details,
    }))
  );
};
