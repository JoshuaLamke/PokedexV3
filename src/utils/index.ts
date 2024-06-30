import capitalize from "lodash/capitalize";
import { NameUrl, PokemonInfo, TypeDetails, TypeEffectivenessMap, TypeMatchupObj } from "../types";

export * from "./typeColors";
export * from "./typeImages";
export * from "./colors";
export * from "./evo";

export const regions = {
  "Kanto (1 - 151)": [1, 151],
  "Johto (152 - 251)": [152, 251],
  "Hoenn (252 - 386)": [252, 386],
  "Sinnoh (387 - 494)": [387, 494],
  "Unova (495 - 649)": [495, 649],
  "Kalos (650 - 721)": [650, 721],
  "Alola (722 - 809)": [722, 809],
  "Galar (810 - 898)": [810, 898]
};

export const kgsToLbs = (kgs: number) => {
  return (
    Math.round(kgs * 2.2 * 100) / 100
  );
};

export const lbsToKgs = (lbs: number) => {
  return (
    Math.round(lbs / 2.2 * 100) / 100
  );
};

export const metersToFeetInches = (meters: number) => {
  const feet = Math.floor(meters * 3.28);
  const inches = Math.floor(((meters * 3.28) - feet) / (1 / 12));
  return `${feet}' ${inches}"`;
};

export const feetInchesToMeters = (feet: number, inches: number) => {
  const inchesToMetersConversion = 0.0254;
  const numInches = (feet * 12) + inches;
  return Math.round((numInches * inchesToMetersConversion) * 100) / 100;
};

export const getImageURLFromInfoObj = (info: PokemonInfo) => (
  info.sprites.other["official-artwork"].front_default ?? 
  info.sprites.other.dream_world.front_default ?? 
  info.sprites.other.home.front_default ?? 
  info.sprites.front_default ?? 
  undefined
)

export const getTypesForMultiplier = (typeStats: Record<string, number>, multiplier: 0 | 0.25 | 0.5 | 1 | 2 | 4) => {
  const typesWithMultiplier = [];
  for (const k in typeStats) {
    if (typeStats[k] === multiplier) {
      typesWithMultiplier.push(k);
    }
  }
  return typesWithMultiplier;
};

export const normalizeSentence = (input: string) => {
  // Use a regular expression to match only alphanumeric characters, spaces, and common punctuation
  const normalizedString = input.replace(/[^a-zA-Z0-9\s.,!?;:'"()-]/g, '');

  // Replace multiple spaces with a single space and trim any leading or trailing spaces
  const trimmedString = normalizedString.replace(/\s+/g, ' ').trim();

  return trimmedString;
}

export function calculateTypeMatchups(types: TypeDetails[]) {
  return types.reduce((acc, curr) => {
    const typeMatchup = createTypeMatchup(curr);
    return {
      ...acc,
      [curr.name]: typeMatchup
    }
  }, {} as TypeEffectivenessMap)
}

export function createTypeMatchup(type: TypeDetails): TypeMatchupObj {
  const defense = {
    ...calculateMultiplierTypes(2, type.damage_relations.double_damage_from),
    ...calculateMultiplierTypes(0.5, type.damage_relations.half_damage_from),
    ...calculateMultiplierTypes(0, type.damage_relations.no_damage_from),
  };

  const attack = {
    ...calculateMultiplierTypes(2, type.damage_relations.double_damage_to),
    ...calculateMultiplierTypes(0.5, type.damage_relations.half_damage_to),
    ...calculateMultiplierTypes(0, type.damage_relations.no_damage_to),
  };

  const defaultTypeMatchup = POKEMON_TYPES.reduce((acc, curr) => {
    return {
      defense: {
        ...acc.defense,
        [curr]: 1,
      },
      attack: {
        ...acc.attack,
        [curr]: 1,
      }
    }
  }, {} as TypeMatchupObj);

  return {
    defense: {
      ...defaultTypeMatchup.defense,
      ...defense,
    },
    attack: {
      ...defaultTypeMatchup.attack,
      ...attack,
    }
  };
}

export function calculateMultiplierTypes(multiplier: number, types: NameUrl[]) {
  return types.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: multiplier
    }
  }, {} as Record<string, number>);
}

export const calculateAllMultipliers = (matchups: Record<string, number>[]) => {

  return POKEMON_TYPES.reduce((acc, curr) => {
    const multiplier = matchups.reduce((prev, matchup) => prev * matchup[curr], 1);

    return {
      ...acc,
      [multiplier]: [...(acc[multiplier] ?? []), capitalize(curr)],
    }
  }, {
    0: [],
    0.25: [],
    0.5: [],
    1: [],
    2: [],
    4: [],
  } as Record<number, string[]>);
}

export const effectivenessVerbiageMap: Record<number, string> = {
  0: "No",
  0.25: "Quarter",
  0.5: "Half",
  1: "Normal",
  2: "Double",
  4: "Quadruple",
}

export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting",
  "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
  "dragon", "dark", "steel", "fairy"
];

export const GAME_VERSIONS = [
  "red-blue",
  "yellow",
  "gold-silver",
  "crystal",
  "ruby-sapphire",
  "emerald",
  "firered-leafgreen",
  "diamond-pearl",
  "platinum",
  "heartgold-soulsilver",
  "black-white",
  "colosseum",
  "xd",
  "black-2-white-2",
  "x-y",
  "omega-ruby-alpha-sapphire",
  "sun-moon",
  "ultra-sun-ultra-moon",
  "lets-go-pikachu-lets-go-eevee",
  "sword-shield",
  "the-isle-of-armor",
  "the-crown-tundra",
  "brilliant-diamond-and-shining-pearl",
  "legends-arceus",
];

export const MOVE_LEARN_METHODS = [
  "level-up",
  "egg",
  "tutor",
  "machine",
  "stadium-surfing-pikachu",
  "light-ball-egg",
  "colosseum-purification",
  "xd-shadow",
  "xd-purification",
  "form-change",
  "zygarde-cube"
];

export const eggGroups = [
  { label: "Amorphous", value: "Amorphous" },
  { label: "Bug", value: "Bug" },
  { label: "Dragon", value: "Dragon" },
  { label: "Fairy", value: "Fairy" },
  { label: "Field", value: "Field" },
  { label: "Flying", value: "Flying" },
  { label: "Grass", value: "Grass" },
  { label: "Human-Like", value: "Human-Like" },
  { label: "Mineral", value: "Mineral" },
  { label: "Water 1", value: "Water 1" },
  { label: "Water 2", value: "Water 2" },
  { label: "Water 3", value: "Water 3" },
  { label: "Ditto", value: "Ditto" },
  { label: "Undiscovered", value: "Undiscovered" },
];

export const growthRates = [
  { label: "Very Slow", value: "Very Slow" },
  { label: "Slow", value: "Slow" },
  { label: "Medium Slow", value: "Medium Slow" },
  { label: "Medium", value: "Medium" },
  { label: "Medium Fast", value: "Medium Fast" },
  { label: "Fast", value: "Fast" },
  { label: "Very Fast", value: "Very Fast" },
];