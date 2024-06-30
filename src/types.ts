export type Card = {
  number: number;
  order: number;
  name: string;
  types: string[];
  image?: string;
}

export type Filters = {
  regions: string;
  number: string;
  name: string;
  types: string;
}

export type NameUrl = {
  name: string;
  url: string;
};

export type OtherSprites = {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  },
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  },
  "official-artwork": {
    front_default: string | null;
  }
};

export type AbilityObj = {
  ability: NameUrl;
  is_hidden: boolean;
  slot: number;
};

export type GameIndex = {
  game_index: number;
  version: NameUrl;
};

export type HeldItem = {
  item: NameUrl[];
  version_details: {
    rarity: number;
    version: NameUrl;
  }[];
};

export type Move = {
  move: NameUrl;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NameUrl;
    version_group: NameUrl;
  }[];
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: NameUrl;
};

export type Type = {
  slot: number;
  type: NameUrl;
};

export type TableRow = { header: React.ReactNode; value: React.ReactNode };

export type PokemonInfo = {
  abilities: AbilityObj[];
  base_experience: number;
  forms: NameUrl[];
  game_indicies: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: unknown[];
  species: NameUrl;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: OtherSprites;
    versions: Record<string, unknown>;
  },
  stats: Stat[];
  types: Type[];
  weight: number;
};

export type FlavorText = {
  flavor_text: string;
  language: NameUrl;
  version: NameUrl;
};

export type Genus = {
  genus: string;
  language: NameUrl;
};

export type Name = {
  language: NameUrl;
  name: string;
};

export type PalParkEncounters = {
  area: NameUrl;
  base_score: number;
  rate: number;
};

export type SpeciesDetails = {
  base_happiness: number;
  capture_rate: number;
  color: NameUrl;
  egg_groups: NameUrl[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: unknown;
  flavor_text_entries: FlavorText[];
  form_descriptions: unknown[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: NameUrl;
  growth_rate: NameUrl;
  habitat: NameUrl;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounters[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: NameUrl;
  }[];
  shape?: NameUrl;
  varieties: {
    is_default: boolean;
    pokemon: NameUrl;
  }[];
};

export type EvolutionRequirements = {
  gender: number | null;
  held_item: NameUrl | null;
  item: NameUrl | null;
  known_move: NameUrl | null;
  known_move_type: NameUrl | null;
  location: NameUrl | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NameUrl | null;
  party_type: NameUrl | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NameUrl | null;
  trigger: NameUrl;
  turn_upside_down: boolean;
};

export type EvoLink = {
  evolves_to: EvoLink[];
  evolution_details: EvolutionRequirements[];
  is_baby: boolean;
  species: NameUrl;
};

export type EvolutionDetails = {
  baby_trigger_item: NameUrl;
  id: number;
  chain: EvoLink;
};

export type Crumb = {
  content: string;
  to: string;
  active: boolean;
  icon?: string;
};

export type DamageRelation = {
  double_damage_from: NameUrl[],
  double_damage_to: NameUrl[],
  half_damage_from: NameUrl[],
  half_damage_to: NameUrl[],
  no_damage_from: NameUrl[],
  no_damage_to: NameUrl[],
};

export type TypeDetails = {
  damage_relations: DamageRelation;
  game_indices: {
    game_index: number;
    generation: NameUrl;
  }[];
  generation: NameUrl;
  id: number;
  move_damage_class: NameUrl | null;
  moves: NameUrl[];
  name: string;
  names: {
    language: NameUrl;
    name: string;
  }[];
  past_damage_relations: {
    damage_relations: DamageRelation;
    generation: NameUrl;
  }[];
  pokemon: {
    pokemon: NameUrl;
    slot: number;
  }[];
};

export type MoveDetails = {
  accuracy: number | null;
  contest_combos: {
    normal: {
      use_after: NameUrl[];
      use_before: NameUrl[];
    } | null;
    super: {
      use_after: NameUrl[];
      use_before: NameUrl[];
    } | null;
  } | null;
  contest_effect: {
    url: string;
  };
  contest_type: NameUrl;
  damage_class: NameUrl;
  effect_chance: number | null;
  effect_changes: {
    effect_entries: {
      effect: string;
      language: NameUrl;
    }[];
    version_group: NameUrl;
  }[];
  effect_entries: {
    effect: string;
    language: NameUrl;
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NameUrl;
    version_group: NameUrl;
  }[];
  generation: NameUrl;
  id: number;
  learned_by_pokemon: NameUrl[];
  meta: {
    max_hits: number | null;
    max_turns: number | null;
    min_hits: number | null;
    min_turns: number | null;
    stat_chance: number;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    category: NameUrl;
    ailment_chance: number;
    ailment: NameUrl;
  };
  machines: unknown[];
  name: string;
  names: {
    language: NameUrl;
    name: string;
  }[];
  past_values: unknown[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: unknown[];
  super_contest_effect: {
    url: string;
  };
  target: NameUrl;
  type: NameUrl;
};

export type VersionDetails = {
  id: number;
  name: string;
  names: {
    language: NameUrl;
    name: string;
  }[];
  version_group: NameUrl;
};

export type VersionGroupDetails = {
  id: number;
  name: string;
  generation: NameUrl;
  move_learn_methods: NameUrl[];
  order: number;
  pokedexes: NameUrl[];
  regions: NameUrl[];
  versions: NameUrl[];
};

export type TypeMatchupObj = {
  attack: Record<string, number>, 
  defense: Record<string, number>
};

// Shows each types attack and defense type matchups
export type TypeEffectivenessMap = Record<string, TypeMatchupObj>;