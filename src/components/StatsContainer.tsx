import { PokemonInfo } from "../types";
import StatDonut from "./StatDonut";

interface Props {
  data: PokemonInfo;
}
const StatsContainer = ({ data }: Props) => {
  const statLabels: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SP-ATK",
    "special-defense": "SP-DEF",
    speed: "SPEED",
  };

  const statColors: Record<string, string> = {
    hp: "rgb(116, 227, 154)",
    attack: "rgb(233, 69, 96)",
    defense: "rgb(150, 126, 118)",
    "special-attack": "rgb(165, 98, 220)",
    "special-defense": "rgb(240, 180, 120)",
    speed: "rgb(0, 158, 255)",
  };

  return (
    <>
      <h3 className="text-3xl sm:text-4xl md:text:5xl text-gray-900">Stats</h3>
      <div className="mt-5 w-full grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3">
        {data.stats.map(({ base_stat, stat: { name } }) => (
          <StatDonut
            key={name}
            value={base_stat}
            strokeWidth={20}
            size={150}
            color={statColors[name]}
            label={statLabels[name]}
          />
        ))}
      </div>
    </>
  );
};

export default StatsContainer;
