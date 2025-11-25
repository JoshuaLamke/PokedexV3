import { calculateAllMultipliers, calculateTypeMatchups } from "../utils";
import TypeEffectivenessTable from "./TypeEffectivenessTable";
import Switch from "./Switch";
import { useState } from "react";
import useTypes from "../hooks/useTypes";
import Spinner from "./Spinner";
import useCacheTypeMatchups from "../hooks/useCacheTypeMatchups";
import useTypeMatchups from "../hooks/useTypeMatchups";
import { usePokemonDetail } from "../pokemonData/usePokemonDetail";

interface Props {
  name: string;
}
const TypeEffectivenessSection = ({ name }: Props) => {
  const typesResults = useTypes();
  useCacheTypeMatchups();
  const cachedTypeMatchups = useTypeMatchups();
  const { data: pokemon, isLoading: pokemonIsLoading } = usePokemonDetail(name);
  const [checked, setChecked] = useState(false);

  if (
    typesResults.some((query) => query.isLoading) ||
    pokemonIsLoading ||
    !pokemon
  ) {
    return (
      <div className="w-full flex justify-center border-t border-b items-center">
        <h3 className="text-green-700 text-3xl sm:text-4xl md:text:5xl my-4 mr-2">
          Loading Type Matchups
        </h3>
        <Spinner />
      </div>
    );
  }

  if (!typesResults.every((query) => query.data)) {
    return null;
  }

  const types = typesResults.map((query) => query.data!);

  const typeMatchups = cachedTypeMatchups ?? calculateTypeMatchups(types);

  const pokemonTypes = pokemon.types.map((type) => type.type.name);
  const defenseMultipliers = calculateAllMultipliers(
    pokemonTypes.map((type) => typeMatchups[type].defense)
  );
  const attackMultipliers = calculateAllMultipliers(
    pokemonTypes.map((type) => typeMatchups[type].attack)
  );

  return (
    <div className="my-5">
      <div className="flex flex-col-reverse text-center sm:flex-row sm:justify-between items-center">
        <h3 className="text-3xl sm:text-4xl md:text:5xl mr-2">
          {checked
            ? "Type Effectiveness (Defense)"
            : "Type Effectiveness (Attack)"}
        </h3>
        <Switch checked={checked} setChecked={setChecked} />
      </div>
      {checked ? (
        <TypeEffectivenessTable data={defenseMultipliers} type="defense" />
      ) : (
        <TypeEffectivenessTable data={attackMultipliers} type="attack" />
      )}
    </div>
  );
};

export default TypeEffectivenessSection;
